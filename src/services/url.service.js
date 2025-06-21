const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const Url = require('../models/url.model');
const Click = require('../models/click.model');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const shortenUrlService = async (urlBody) => {
  const { originalUrl, alias, expiration, password, userId, baseUrl, title } = urlBody;
  const shortId = alias || nanoid(7);

  if (alias !== undefined) {
    const aliasExists = await Url.findOne({ alias });
    if (aliasExists) {
      return { status: 400, message: 'Alias already in use' };
    }
  }

  const passwordHash = password ? await bcrypt.hash(password, 10) : null;

  const urlDoc = await Url.create({
    originalUrl,
    shortId,
    title,
    alias,
    expiration: expiration ? new Date(expiration) : null,
    passwordHash,
    owner: userId,
  });

  return {
    status: 201,
    title,
    shortUrl: `${baseUrl}/${urlDoc.shortId}`,
    originalUrl: urlDoc.originalUrl,
    expiration: urlDoc.expiration,
    clicks: urlDoc.clickCount,
  };
};

const verifyUrl = async (urlBody) => {
  const { shortId, password, referrer, ip } = urlBody;

  const url = await Url.findOne({ shortId });
  if (!url) {
    return { status: 404, message: 'URL not found' };
  }
  if (url.passwordHash) {
    const match = await bcrypt.compare(password, url.passwordHash);
    if (!match) {
      return { status: 403, message: 'Incorrect password' };
    }
  }

  url.clickCount++;

  await url.save();
  await Click.create({
    urlId: url._id,
    referrer,
    ip,
  });

  return { status: 200, originalUrl: url.originalUrl };
};

const getUserUrls = async (userId) => {
  const urls = await Url.find({ owner: userId });
  return urls.map((url) => ({
    id: url._id,
    shortId: url.shortId,
    alias: url.alias,
    originalUrl: url.originalUrl,
    expiration: url.expiration,
    passwordHash: url.passwordHash,
    clicks: url.clickCount,
    created_at: url.createdAt,
  }));
};

module.exports = {
  shortenUrlService,
  verifyUrl,
  getUserUrls,
};
