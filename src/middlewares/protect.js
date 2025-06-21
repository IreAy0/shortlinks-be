const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'No token provided'));
  }
  // You can add more token validation logic here if needed
  next();
};

module.exports = protect;
