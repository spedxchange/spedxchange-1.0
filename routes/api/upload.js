const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const config = require('config');

const auth = require('../../middleware/auth');
const Document = require('../../models/Document');

// S3
const multer = require('multer');
const multerS3 = require('multer-s3');

const AWSAccessKeyId = config.get('AWSAccessKeyId');
const AWSSecretKey = config.get('AWSSecretKey');
const AWSBucketName = config.get('AWSBucketName');
const AWSRegion = config.get('AWSRegion');
const AWSUploadURL = config.get('AWSUploadURL');

// @route    GET api/upload
// @desc     Get all Documents & Routes
// @access   Public
router.get('/', async (req, res) => {
  try {
    const files = await Document.find().sort({ createdAt: 1 });
    res.json(files);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/upload/:id
// @desc     Get Documents by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const file = await Document.findById(req.params.id);
    res.json(file);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/upload/file
// @desc     Upload File
// @access   Private
router.post('/file', async (req, res) => {
  try {
    const s3 = new aws.S3({
      accessKeyId: AWSAccessKeyId,
      secretAccessKey: AWSSecretKey,
      region: AWSRegion
    });

    upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: AWSBucketName,
        metadata: function(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
          cb(null, Date.now().toString());
        }
      })
    });

    const file = req.files.file;
    const s3FileURL = AWSUploadURL;

    // console.log('file: ', file);

    const s3bucket = new AWS.S3({
      accessKeyId: AWSAccessKeyId,
      secretAccessKey: AWSSecretKey,
      region: AWSRegion
    });

    const params = {
      Bucket: AWSBucketName,
      Key: file,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    // console.log('params: ', params);

    // Upload file to AWS S3
    const fileData = await s3bucket.putObject(params);
    console.log('fileData: ', fileData);

    // Get file Signed URL
    const urlParams = {
      Bucket: AWSBucketName,
      Key: file.name
    };

    const fileURL = await s3bucket.getSignedUrl('getObject', urlParams);

    const fileRecord = new Document({
      description: req.body.description || 'No description',
      link: s3FileURL + file.name,
      url: fileURL,
      key: params.Key.name
    });

    await fileRecord.save();

    res.json(fileRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
  /*
  try {
    const file = req.file;
    const s3FileURL = AWSUploadURL;

    const params = {
      Bucket: AWSBucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    console.log('start try');

    // Upload the file
    const fileData = await s3bucket.upload(params);

    // Get the Signed Url
    const urlParams = {
      Bucket: AWSBucketName,
      Key: file.originalname
    };

    const fileURL = await s3bucket.getSignedUrl('getObject', urlParams);

    const fileRecord = new Document({
      description: req.body.description,
      link: s3FileURL + file.originalname,
      url: fileURL,
      key: params.Key
    });

    await fileRecord.save();

    res.json(fileData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
  */
});

// @route    PUT api/upload/edit/:id
// @desc     Edit File Description
// @access   Private
router.put('/edit/:id', auth, async (req, res) => {
  try {
    const file = await Document.findByIdAndUpdate(req.params.id);
    file.description = req.body.description;
    await file.save();
    res.json(file);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/upload/:id
// @desc     Delete File
// @access   Private
router.delete(':id', auth, async (req, res) => {
  try {
    // Get the file record
    const file = await Document.findById(req.params.id);

    const s3bucket = new AWS.S3({
      accessKeyId: AWSAccessKeyId,
      secretAccessKey: AWSSecretKey,
      region: AWSRegion
    });

    const params = {
      Bucket: AWSBucketName,
      Key: file.s3_key
    };

    // Remove file from AWS-S3
    await s3bucket.deleteObject(params);

    // Remove file reference from MongoDB
    await file.remove();

    res.json({ msg: 'File removed.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
