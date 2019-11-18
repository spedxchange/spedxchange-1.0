const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const RouteUtil = require('../routeUtil');
const SpedEmail = require('./templates/templates');
const User = require('../../models/User');

// @route    GET api/auth
// @desc     Get User Record
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        path: 'roles',
        select: 'type'
      });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate User & Get Token
// @access   Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

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
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth/request-reset
// @desc     Request Reset Password Email Link
// @access   Public
router.post('/request-reset', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    console.log('request-reset: user: ', user);
    if (!user) {
      console.error('No User Found');
      res.status(500).send('Server error');
    }

    const token = await bcrypt.genSalt(20);

    user.reset_password_token = token;
    user.reset_password_expires = Date.now() + 86400000;
    await user.save();

    const resetLink = 'https://spedxchange.herokuapp.com/user/reset?token=' + token;

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
router.post('/reset', async (req, res) => {
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
