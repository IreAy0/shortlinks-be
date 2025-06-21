const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const urlSchema = new mongoose.Schema(
  {
    originalUrl: String,
    shortId: { type: String, unique: true },
    alias: { type: String, unique: true, sparse: true },
    passwordHash: String,
    expiration: Date,
    createdAt: { type: Date, default: Date.now },
    clickCount: { type: Number, default: 0 },
    title: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  {
    timestamps: true,
  }
);

urlSchema.plugin(paginate);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
