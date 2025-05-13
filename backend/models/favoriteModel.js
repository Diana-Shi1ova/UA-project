const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
  },
  {
    timestamps: true, // useful if you want to show "added to favorites on..."
  }
);

module.exports = mongoose.model('Favorite', favoriteSchema);
