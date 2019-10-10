const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleTagSchema = new Schema({
  tagName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  articleCount: {
    type: Number,
    default: 0
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'article'
    }
  ]
}).index({ tagName: 'text', description: 'text' });

module.exports = ArticleTag = mongoose.model('article-tag', ArticleTagSchema);
