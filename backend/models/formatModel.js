const mongoose = require('mongoose');

const formatSchema = new mongoose.Schema({
  extention: {
    type: String,
    required: [true, 'Please add a format name'],
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

module.exports = mongoose.model('Format', formatSchema);
