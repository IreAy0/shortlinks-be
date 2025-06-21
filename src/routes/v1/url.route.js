const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const urlValidation = require('../../validations/url.validation');
const urlController = require('../../controllers/url.controller');
const protect = require('../../middlewares/protect');

const router = express.Router();

router.post('/shorten', validate(urlValidation.createUrl), urlController.shortenUrl);
router.post('/verify/:shortId', validate(urlValidation.passwordValidation), urlController.verifyUrl);
router.get('/all', protect, urlController.getUrls);

module.exports = router;
