const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, urlService } = require('../services');
const { verifyToken } = require('../services/token.service');
const { tokenTypes } = require('../config/tokens');

const shortenUrl = catchAsync(async (req, res, next) => {
  const { originalUrl } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  let userId = null;
  if (token) {
    try {
      const decoded = await verifyToken(token, tokenTypes.REFRESH)
      userId = decoded.user;
    } catch {}
  }
  if (!originalUrl || !/^https?:\/\/.+/i.test(originalUrl)) {
    throw new ApiError(httpStatus['400_MESSAGE'], 'Invalid URL');
  }
  try {
    const url = await urlService.shortenUrlService({...req.body, userId})
    res.status(url.status).send(url);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'server error' });
  }
})

const verifyUrl = catchAsync(async (req, res, next) => {
  const { shortId } = req.params;
  const referrer = req.get('Referrer') || '';
  const ip = req.ip;
  try {
    const url = await urlService.verifyUrl({ ...req.body, shortId }, referrer, ip);
    res.status(url.status).send(url);
  } catch (error) {
     res.status(500).json({ status: 500, message: 'server error' });
  }
})

const getUrls = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  let userId = null;

  if (token) {
    try {
      const decoded = await verifyToken(token, tokenTypes.REFRESH)
      userId = decoded.user;
      } catch(error) {
        console.log('error token', error)
      res.status(500).json({ status: 500, message: 'server error', error: error });
      }
    }

    try {
      const data = await urlService.getUserUrls(userId);
      res.status(200).json({status: 200, data: data});
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ status: 500, message: 'server error' });
    }

})

module.exports = {
  shortenUrl,
  verifyUrl,
  getUrls
}
