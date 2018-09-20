const mongoose = require('mongoose');

module.exports = mongoose.model('Celebrity', new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
      unique: true
  },
  occupation: {
    type: String,
    default: 'unknown',
  },
  catchPhrase: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            ret.created_at = Math.floor(ret.createdAt.getTime() / 1000);

            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;

            return ret;
        }
    }
}));
