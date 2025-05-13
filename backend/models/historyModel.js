const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
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
    timestamps: { createdAt: 'date', updatedAt: false },
  }
);

module.exports = mongoose.model('History', historySchema);
