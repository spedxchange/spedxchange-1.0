const express = require('express');
const router = express.Router();

// @route    GET api/search/:term
// @desc     Get Search Results by Term
// @access   Public
router.get('/:term', async (req, res) => {
  try {
    // const results = await Question.find({$text: {$search: req.params.id}});

    const results = {
      questions: [],
      articles: [],
      tags: []
    };

    res.json(results);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
