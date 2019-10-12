const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
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
}).index({ description: 'text' });

module.exports = Category = mongoose.model('category', CategorySchema);
