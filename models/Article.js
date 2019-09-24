const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author'
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Draft'
  },
  photoURL: {
    type: String
  },
  videoURL: {
    type: String
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'article-tag'
    }
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'article-category'
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      content: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  published: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('article', ArticleSchema);
