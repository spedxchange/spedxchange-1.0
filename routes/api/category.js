const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Category = require('../../models/Category');
const ArticleCategory = require('../../models/ArticleCategory');
const Question = require('../../models/Question');
const Article = require('../../models/Article');

// @route    GET api/category
// @desc     Get all Question Categories
// @access   Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/category/article
// @desc     Get all Article Categories
// @access   Public
router.get('/article', async (req, res) => {
  try {
    const categories = await ArticleCategory.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/category
// @desc     Create Question Category
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const newCategory = new Category({
      categoryName: req.body.categoryName,
      description: req.body.description
    });
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/category/article
// @desc     Create Article Category
// @access   Private
router.post('/article', auth, async (req, res) => {
  try {
    const newCategory = new ArticleCategory({
      categoryName: req.body.categoryName,
      description: req.body.description
    });
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/category/:id
// @desc     Delete Question Category
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    //get uncategorized id to replace category in article
    let general = await Category.find({ categoryName: 'Uncategorized' });
    if (!general) {
      newCat = new Category({
        categoryName: 'Uncategorized',
        description: 'Uncategorized questions.'
      });
      general = await newCat.save();
    }
    // remove category from questions
    for (let questionId of category.questions) {
      let question = await Question.findById(questionId);
      question.category = general._id;
      await question.save();
    }
    // remove category
    await category.remove();

    res.json({ msg: 'Tag removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/category/article:id
// @desc     Delete Article Category
// @access   Private
router.delete('/article/:id', auth, async (req, res) => {
  try {
    const category = await ArticleCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    //get uncategorized id to replace category in article
    let general = await ArticleCategory.find({ categoryName: 'Uncategorized' });
    if (!general) {
      newCat = new ArticleCategory({
        categoryName: 'Uncategorized',
        description: 'Uncategorized posts.'
      });
      general = await newCat.save();
    }
    // remove category from articles
    for (let articleId of category.articles) {
      let article = await Article.findById(articleId);
      article.category = general._id;
      await article.save();
    }

    // remove category
    await category.remove();

    res.json({ msg: 'Tag removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
