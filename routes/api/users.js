const express = require('express');
const path = require('path');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const auth = require('../../middleware/auth');
const RouteUtil = require('../routeUtil');

const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../../models/User');
const Role = require('../../models/Role');

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secureConnection: true,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASS
  }
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('../../templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, roles } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    user = new User({
      displayName,
      email,
      avatar,
      password
    });

    // Handle Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Handle roles
    user.roles = [];
    if (roles && roles.length > 0) {
      let role;
      for (role of roles) {
        const newRole = await Role.findOne({ type: role });
        console.log('newRole: ', newRole);
        if (newRole) {
          console.log('newRole._id: ', newRole._id), user.roles.push(newRole._id);
        }
      }
    } else {
      const newRole = await Role.findOne({ type: 'reader' });
      if (newRole) {
        user.roles.push(newRole._id);
      }
    }
    await user.save();

    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/users/forgot
// @desc     Send Reset Password Email Link
// @access   Private
router.post('/forgot', auth, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found.' }] });
    }

    const token = await bcrypt.genSalt(20);

    user.reset_password_token = token;
    user.reset_password_expires = Date.now() + 86400000;
    await user.save();

    const data = {
      to: user.email,
      from: 'SPEDxchange <content@spedxchange.com>',
      template: 'forgot-password-email',
      subject: 'SPEDxchange: Forgot Password',
      context: {
        url: 'http://localhost:3000/user/reset?token=' + token,
        name: RouteUtil.toTitleCase(user.displayName.split(' ')[0])
      }
    };

    await smtpTransport.sendMail(data);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/users/forgot
// @desc     Register User
// @access   Public
router.post('/reset', auth, async (req, res) => {
  try {
    const { token, newPassword, verifyPassword } = req.body;
    const user = await User.findOne({
      reset_password_token: token,
      reset_password_expires: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found.' }] });
    }

    if (newPassword === verifyPassword) {
      user.password = bcrypt.hashSync(newPassword, 10);
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;
      await user.save();
      const data = {
        to: user.email,
        from: 'SPEDxchange <content@spedxchange.com>',
        template: 'reset-password-email',
        subject: 'SPEDxchange: Password Reset Confirmation',
        context: {
          name: RouteUtil.toTitleCase(user.displayName.split(' ')[0])
        }
      };
      await smtpTransport.sendMail(data);
    } else {
      return res.status(422).send({
        message: 'Passwords do not match.'
      });
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
