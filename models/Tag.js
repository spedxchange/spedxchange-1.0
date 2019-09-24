const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  tagName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  questionCount: {
    type: Number
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'question'
    }
  ]
}).index({ tagName: 'text', description: 'text' });

module.exports = Tag = mongoose.model('tag', TagSchema);
