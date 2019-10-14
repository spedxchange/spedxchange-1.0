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
    rawText: rawTextParse.structuredText,
    summary: article.summary,
    author: authorId,
    photoURL: article.imageData.title || '',
    videoURL: article.video || '',
    status: article.status || 'Draft',
    created: created,
    updated: updated,
    published: published
  };

  try {
    // Find Article
    const currentArticle = await Article.findOne({ slug: articleData.slug });
    console.log('currentArticle: ', currentArticle);
    currentArticle.content = article.content;
    if (article.slug === 'what-is-a-sped-director-looking-for-in-a-first-year-staff-member') {
      console.log('structuredText: ', article.rawText);
    }
    await currentArticle.save();
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
