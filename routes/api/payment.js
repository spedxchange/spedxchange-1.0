const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// @route    GET api/subscribe/:productPlan
// @desc     GET Get/Create Stripe Customer and Subscribe to Plan
// @access   Public
router.post('/subscribe/:productPlan', auth, async (req, res) => {
  const { productPlan } = req.body;
  let customer;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User Unknown' }] });
    }
    const customerId = user.stripeId;
    if (customerId) {
      customer = await stripe.customers.retrieve(stripeId);
    } else {
      customer = await stripe.customers.create({
        email: user.email
      });

      user.stripeId = customer.id;
      await user.save();
    }

    const subscription = await stripe.subscriptions.create({
      customer: user.stripeId,
      items: [{ plan: productPlan }]
    });

    res.json({
      customer: customer,
      subscription: subscription
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
