const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const RouteUtil = require('../routeUtil');

const Question = require('../../models/Question');
const Answer = require('../../models/Answer');
const User = require('../../models/User');
const Tag = require('../../models/Tag');
const Category = require('../../models/Category');

// @route    GET api/questions
// @desc     Get all Questions
// @access   Public
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ updated: -1 })
      .populate({
        path: 'user',
        select: ['displayName', 'avatar']
      })
      .populate({
        path: 'categories',
        select: 'categoryName'
      })
      .populate({
        path: 'tags',
        select: 'tagName'
      });
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/:uid/:slug
// @desc     Get Question by Id
// @access   Public
router.get('/:uid/:slug', async (req, res) => {
  try {
    const question = await Question.find({
      uid: req.params.uid,
      slug: req.params.slug
    })
      .populate({
        path: 'user',
        select: ['displayName', 'avatar']
      })
      .populate({
        path: 'categories',
        select: 'categoryName'
      })
      .populate({
        path: 'tags',
        select: 'tagName'
      })
      .populate({
        path: 'answers'
      });

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/:question_id
// @desc     Get Question by Id
// @access   Public
router.get('/:question_id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id)
      .populate({
        path: 'user',
        select: ['displayName', 'avatar']
      })
      .populate({
        path: 'categories',
        select: 'categoryName'
      })
      .populate({
        path: 'tags',
        select: 'tagName'
      })
      .populate({
        path: 'answers'
      });

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/questions
// @desc     Create Question
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required.')
        .not()
        .isEmpty(),
      check('content', 'Content is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, tags, category } = req.body;
    const uid = RouteUtil.createUid();
    const slug = RouteUtil.createSlug(req.body.title);

    console.log('uid: ', uid);
    console.log('slug: ', slug);

    try {
      const newQuestion = new Question({
        user: req.user.id,
        title: title,
        content: content,
        uid: uid,
        slug: slug
      });

      // Save question
      const question = await newQuestion.save();

      // Handle tags
      if (tags && tags.length > 0) {
        let tag;
        for (tag of tags) {
          tagName = tag.toLowerCase().trim();
          let existingTag = await Tag.findOne({ tagName: tagName });
          if (!existingTag) {
            const newTag = new Tag({
              tagName: tagName,
              questionCount: 1,
              questions: question._id
            });
            const createdTag = await newTag.save();
            question.tags.push(createdTag._id);
            await question.save();
          } else {
            existingTag.questions.push(question._id);
            existingTag.questionCount++;
            question.tags.push(existingTag._id);
            await existingTag.save();
            await question.save();
          }
        }
      }

      // Handle category
      const qCategory = category ? category.toLowerCase().trim() : 'no category';
      let existingCategory = await Category.findOne({ categoryName: qCategory });
      if (!existingCategory) {
        const newCategory = new Category({
          categoryName: qCategory,
          questionCount: 1,
          questions: question._id
        });
        const createdCategory = await newCategory.save();
        question.category = createdCategory._id;
        await question.save();
      } else {
        existingCategory.questions.push(question._id);
        existingCategory.questionCount++;
        await existingCategory.save();
        question.category = existingCategory._id;
        await question.save();
      }

      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/questions/admin/:user_id
// @desc     Create Question for A User
// @access   Private
router.post(
  '/admin/:user_id',
  [
    auth,
    [
      check('title', 'Title is required.')
        .not()
        .isEmpty(),
      check('content', 'Content is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, tags, category } = req.body;
    const uid = RouteUtil.createUid();
    const slug = RouteUtil.createSlug(title);

    try {
      const newQuestion = new Question({
        user: req.params.user_id,
        title: title,
        content: content,
        uid: uid,
        slug: slug
      });

      // Save question
      const question = await newQuestion.save();

      // Handle tags
      if (tags && tags.length > 0) {
        let tag;
        for (tag of tags) {
          tagName = tag.toLowerCase().trim();
          let existingTag = await Tag.findOne({ tagName: tagName });
          if (!existingTag) {
            const newTag = new Tag({
              tagName: tagName,
              questionCount: 1,
              questions: question._id
            });
            const createdTag = await newTag.save();
            question.tags.push(createdTag._id);
            await question.save();
          } else {
            existingTag.questions.push(question._id);
            existingTag.questionCount++;
            question.tags.push(existingTag._id);
            await existingTag.save();
            await question.save();
          }
        }
      }

      // Handle category
      const qCategory = category ? category.toLowerCase().trim() : 'no category';
      let existingCategory = await Category.findOne({ categoryName: qCategory });
      if (!existingCategory) {
        const newCategory = new Category({
          categoryName: qCategory,
          questionCount: 1,
          questions: question._id
        });
        const createdCategory = await newCategory.save();
        question.category = createdCategory._id;
        await question.save();
      } else {
        existingCategory.questions.push(question._id);
        existingCategory.questionCount++;
        await existingCategory.save();
        question.category = existingCategory._id;
        await question.save();
      }

      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/questions/:question_id
// @desc     Update Question
// @access   Private
router.put(
  '/:question_id',
  [
    auth,
    [
      check('title', 'Title is required.')
        .not()
        .isEmpty(),
      check('content', 'Content is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const question = await Question.findById(req.params.question_id);

      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }

      const { title, content } = req.body;

      question.title = title;
      question.content = content;
      question.slug = RouteUtil.createSlug(title);

      await question.save();
      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/question/:question_id
// @desc     Delete Question
// @access   Private
router.delete('/:question_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Check user
    if (question.user.toString() !== req.user.id) {
      const currentUser = await User.findById(req.user.id);
      if (currentUser.role !== 'admin') {
        return res.status(401).json({ msg: 'Authorization denied.' });
      }
    }

    // Handle orphaned category
    const category = await Category.findById(question.category);
    category.questionCount--;
    category.questions.pull(question._id);
    await category.save();

    // Handle orphaned tags
    const tags = question.tags;
    if (tags && tags.length > 0) {
      let tag;
      for (tag of tags) {
        let currentTag = await Tag.findById(tag._id);
        currentTag.questionCount--;
        if (currentTag.questionCount === 0) {
          await currentTag.remove();
        } else {
          currentTag.questions.pull({ _id: question._id });
          await currentTag.save();
        }
      }
    }

    // remove question
    await question.remove();

    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/like/:question_id
// @desc     Like Question
// @access   Private
router.put('/like/:question_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Check if the question has already been liked by the user
    if (question.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Question already liked by the user' });
    }

    // Check if the question has been unliked by the user
    // If Yes: Remove Unlike
    // If  No: Add Like
    if (question.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove Unlike
      // question.unlikes.pull({ user: req.user.id });
      const removeIndex = question.unlikes.map(vote => vote.user.toString()).indexOf(req.user.id);
      question.unlikes.splice(removeIndex, 1);
    } else {
      // Add Like
      question.likes.unshift({ user: req.user.id });
    }

    // recount likes and save question
    question.likeCount = question.likes.length + question.unlikes.length;
    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/unlike/:question_id
// @desc     Unlike Question
// @access   Private
router.put('/unlike/:question_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Check if the question has already been unliked by the user
    if (question.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Question already unliked' });
    }

    // Check if the question has been liked by this user
    // If Yes: Remove Like
    // If  No: Add Unlike
    if (question.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove existing down vote
      console.log('user id: ', req.user.id);
      // question.likes.pull({ user: req.user.id });
      const removeIndex = question.likes.map(vote => vote.user.toString()).indexOf(req.user.id);
      question.likes.splice(removeIndex, 1);
    } else {
      // Add Unlike
      question.unlikes.unshift({ user: req.user.id });
    }

    // recount likes and save question
    question.likeCount = question.likes.length + question.unlikes.length;
    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/questions/answer/:question_id
// @desc     Answer A Question
// @access   Private
router.post(
  '/answer/:question_id',
  [
    auth,
    [
      check('content', 'Content is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const question = await Question.findById(req.params.question_id);

      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }

      const newAnswer = new Answer({
        user: req.user.id,
        question: question._id,
        displayName: user.displayName,
        avatar: user.avatar,
        content: req.body.content
      });

      await newAnswer.save();

      question.answers.push(newAnswer._id);
      await question.save();
      res.json(newAnswer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/questions/answer/:question_id/:answer_id
// @desc     Update Answer
// @access   Private
router.put(
  '/answer/:question_id/:answer_id',
  [
    auth,
    [
      check('content', 'Content is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get Question
      const question = await Question.findById(req.params.question_id);

      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }

      // Get Answer
      const answer = question.answers.find(answer => answer.id === req.params.answer_id);
      if (!answer) {
        return res.status(404).json({ msg: 'Answer not found' });
      }

      // Check user
      if (answer.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // let question = await Question.findOneAndUpdate(
      //   { _id: req.params.question_id, 'answers._id': req.params.answer_id },
      //   { $set: { content: content } },
      //   { new: true, upsert: true }
      // );

      answer.set({ content: req.body.content });

      await question.save();
      res.json(question.answers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/questions/answer/like/:question_id/:answer_id
// @desc     Like Answer
// @access   Private
router.put('/answer/like/:question_id/:answer_id', auth, async (req, res) => {
  try {
    // Get Question
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Get Answer
    const answer = question.answers.find(answer => answer.id === req.params.answer_id);

    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    // Check if the answer has already been liked by the user
    if (answer.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Answer already liked by user' });
    }

    // Check if the answer has been uliked by the user
    // If Yes: Remove Unlike
    // If  No: Add Like
    if (answer.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove Unlike
      // answer.unlikes.pull({ user: req.user.id });
      const removeIndex = answer.unlikes.map(vote => vote.user.toString()).indexOf(req.user.id);
      answer.unlikes.splice(removeIndex, 1);
    } else {
      // Add Like
      answer.likes.unshift({ user: req.user.id });
    }

    // recount likes and save question
    answer.likeCount = answer.likes.length + answer.unlikes.length;
    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/answer/unlike/:question_id/:answer_id
// @desc     Unlike Answer
// @access   Private
router.put('/answer/unlike/:question_id/:answer_id', auth, async (req, res) => {
  try {
    // Get Question
    const question = await Question.findById(req.params.question_id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Get Answer
    const answer = question.answers.find(answer => answer.id === req.params.answer_id);
    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    // Check if the answer has already been liked by this user
    if (answer.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Answer already unliked by user' });
    }

    // Check if the answer has been liked by this user
    // If Yes: Remove the like
    // If  No: Add the unlike
    if (answer.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove like
      // answer.likes.pull({ user: req.user.id });
      const removeIndex = answer.likes.map(vote => vote.user.toString()).indexOf(req.user.id);
      answer.likes.splice(removeIndex, 1);
    } else {
      // Add unlike
      answer.unlikes.unshift({ user: req.user.id });
    }

    // recount likes and save question
    answer.likeCount = answer.likes.length + answer.unlikes.length;
    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/questions/answer/:question_id/:answer_id
// @desc     Delete Answer
// @access   Private
router.delete('/answer/:question_id/:answer_id', auth, async (req, res) => {
  try {
    // Get Question
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Get Answer
    const answer = question.answers.find(answer => answer.id === req.params.answer_id);
    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    // Check user
    if (answer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    question.answers.pull({ _id: req.params.answer_id });
    await question.save();
    res.json(question.answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/answer/:answer_id
// @desc     Get Answer by Id
// @access   Public
router.get('/answer/:answer_id', async (req, res) => {
  try {
    const question = await Question.findOne({ 'answers._id': req.params.answer_id });
    const answer = question.answers.find(answer => answer.id === req.params.answer_id);

    console.log('answer: ', answer);

    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    res.json(answer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Answer not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/tags/:question_id/:tags
// @desc     Add Tag to Question
// @access   Private
router.put('/answer/tags/:question_id/:tag', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    const tag = req.params.tag.toLowerCase().trim();
    existingTag = await Tag.find({ tagName: tag });
    if (!existingTag) {
      // add new tag if it does nor exist
      const newTag = new Tag({
        tagName: tag,
        questionCount: 1,
        questions: question._id
      });
      const createdTag = await newTag.save();
      question.tags.push(createdTag._id);
      await question.save();
    } else {
      // update existing tag
      existingTag.questions.push(question._id);
      existingTag.questionCount++;
      question.tags.push(existingTag._id);
      await existingTag.save();
      await question.save();
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Answer not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
