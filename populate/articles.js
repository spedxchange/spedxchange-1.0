const connectDB = require('../config/db');
const HTMLParser = require('node-html-parser');

const RouteUtil = require('../routes/routeUtil');

const Article = require('../models/Article');
const ArticleTag = require('../models/ArticleTag');
const ArticleCategory = require('../models/ArticleCategory');

const articles = require('./data/articles');

const authorId = '5da13e497c9c133ac0f8c103';

const convertDate = fsDate => {
  const info = fsDate._seconds;
  const sec = info.match(/(?<=data":).*?(?=})/)[0];
  return new Date(Number(sec) * 1000);
};

const createArticle = async article => {
  console.log('start: ', article.title);

  //handle dates
  const now = new Date();
  const created = article.createdAt ? convertDate(article.createdAt) : now;
  const updated = article.updatedAt ? convertDate(article.updatedAt) : now;
  const published = article.publishDate ? convertDate(article.publishDate) : now;

  const uid = RouteUtil.createUid();
  const slug = RouteUtil.createSlug(article.title);
  const rawTextParse = HTMLParser.parse(article.content);

  const articleData = {
    uid: uid,
    slug: slug,
    title: article.title,
    content: article.content,
    rawText: rawTextParse.text,
    summary: article.summary,
    author: authorId,
    photoURL: article.image || '',
    videoURL: article.video || '',
    status: article.status || 'Draft',
    created: created,
    updated: updated,
    published: published
  };

  try {
    // upsert Article
    const newArticle = await Article.findOneAndUpdate({ slug: article.id }, articleData, { new: true, upsert: true });

    // handle category
    const category = await ArticleCategory.findOneAndUpdate({ categoryName: article.category }, { categoryName: article.category }, { new: true, upsert: true });
    category.articleCount++;
    if (!category.articles) {
      category.articles = [newArticle._id];
    } else {
      category.articles.push(newArticle._id);
    }
    await category.save();
    newArticle.category = category._id;
    await newArticle.save();

    // handle tags
    for (tag of article.tags) {
      const newTag = await ArticleTag.findOneAndUpdate({ tagName: tag }, { tagName: tag }, { new: true, upsert: true });
      newTag.articleCount++;
      if (!newTag.articles) {
        newTag.articles = [newArticle._id];
      } else {
        newTag.articles.push(newArticle._id);
      }
      await newTag.save();
      newArticle.tags.push(newTag._id);
      await newArticle.save();
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
};

const doArticles = async () => {
  try {
    await connectDB();
    const keys = Object.keys(articles);
    for (const key of keys) {
      await createArticle(articles[key]);
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  } finally {
    process.exit();
  }
};

doArticles();
