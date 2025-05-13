const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    description: {
      type: String,
      default: '',
    },
    categories: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        subcategories: [String]
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    downloadUrls: [
      {
        url: { type: String, required: true },
        size: { type: Number, required: true }, // bytes
        format: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Format',
        },
      },
    ],
    previews: [
      {
        url: { type: String, required: true },
        type: { type: String, required: true }, // image/video/pdf/etc.
        name: { type: String, default: '' },
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Asset', assetSchema);