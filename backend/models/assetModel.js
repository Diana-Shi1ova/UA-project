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
    /*categories: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        subcategories: [String]
      }
    ],*/
    /*tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],*/
    tags: [String],
    downloadUrls: [
      {
        url: { type: String },
        size: { type: Number }, // bytes
        filename: String,
        /*format: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Format',
        },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        }*/
       format: String,
       category: String
      },
    ],
    previews: [
      {
        url: { type: String },
        type: { type: String }, // image/video/pdf/etc.
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