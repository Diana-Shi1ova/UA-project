const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a tag name'],
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model('Tag', tagSchema);
