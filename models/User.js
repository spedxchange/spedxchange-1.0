const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  screenName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  role: {
    type: String,
    default: 'reader'
  },
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = User = mongoose.model('user', UserSchema);
