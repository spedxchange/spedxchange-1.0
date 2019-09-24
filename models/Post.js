const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
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
      displayName: {
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
  tags: {
    type: [String]
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

module.exports = Post = mongoose.model('post', PostSchema);
