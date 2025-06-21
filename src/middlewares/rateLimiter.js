const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
});

const guestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
});

// Limit to 5 requests ever (windowMs set to 10 years)
const urlLimiter = rateLimit({
  windowMs: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years in ms
  max: 5,
  message: 'You have reached the free usage limit. Please login or pay to continue.',
  skipSuccessfulRequests: false, // Count all requests
});

module.exports = {
  authLimiter,
  guestLimiter,
  urlLimiter,
};
