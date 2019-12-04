const axios = require('axios');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

const HEADER_JSON = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const makeProperties = props => {
  var properties = [];
  const entries = Object.entries(props);
  for (const [key, val] of entries) {
    properties.push({
      property: key,
      value: val
    });
  }
  return { properties: properties };
};

// @route    POST api/hubspot/contact
// @desc     Create Hubspot Contact
// @access   Private
router.put('/contact', auth, async (req, res) => {
  const header = HEADER_JSON;
  const properties = makeProperties(req.body);
  const body = JSON.stringify(properties);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const contact = await axios.post(`https://api.hubapi.com/contacts/v1/contact/?hapikey=${process.env.HUBSPOT_API_KEY}`, body, header);
    user.vid = contact.vid;
    await user.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/hubspot/contact/:vid
// @desc     Update Hubspot Contact
// @access   Private
router.put('/contact/:vid', auth, async (req, res) => {
  const { vid } = req.params;
  const header = HEADER_JSON;
  const properties = makeProperties(req.body);
  const body = JSON.stringify(properties);
  try {
    const user = await User.findOne({ vid: vid });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    await axios.post(`https://api.hubapi.com/contacts/v1/contact/vid/${vid}/profile?hapikey=${process.env.HUBSPOT_API_KEY}`, body, header);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
