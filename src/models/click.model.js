const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'Url' },
  timestamp: { type: Date, default: Date.now },
  referrer: String,
  ip: String,
});

/**
 * @typedef Click
 */

const Click = mongoose.model('Click', clickSchema);

module.exports = Click;