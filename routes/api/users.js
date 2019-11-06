const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const RouteUtil = require('../routeUtil');

const JWT_SECRET = process.env.JWT_SECRET;

const SpedEmail = require('./templates/templates');
const User = require('../../models/User');
const Role = require('../../models/Role');

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post('/', async (req, res) => {
  try {
    const { displayName, screenName, email, password, roles } = req.body;
    let user = await User.findOne({ email });
    let screen = await User.findOne({ screenName });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    if (screen) {
      return res.status(400).json({ errors: [{ msg: 'UserName already exists' }] });
    }

    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });

    user = new User({
      displayName: displayName,
      screenName: screenName,
      email: email,
      avatar: avatar,
      password: password
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
        const existingRole = await Role.findOne({ type: role });
        if (existingRole) {
          user.roles.push(existingRole._id);
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

// @route    POST api/users/update
// @desc     Send Update Password Email Link
// @access   Public
router.post('/update', async (req, res) => {
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

    const resetLink = 'http://localhost:3000/user/reset?token=' + token;

    const emailConfig = {
      from: 'SPEDxchange <content@spedxchange.com>',
      to: `${user.displayName} <${email}`,
      subject: 'SPEDxchange: Password Reset',
      html: SpedEmail.contactUserEmail(user.displayName, resetLink)
    };

    await SpedEmail.transporter.sendMail(emailConfig);

    res.json({ success: true });
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
