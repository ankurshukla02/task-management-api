const jwt = require('jsonwebtoken');
const responseHandle = require('../helpers/responseHandle');
const responseMessage = require('../helpers/responseMessage');
const responseCode = require('../helpers/responseCode');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return responseHandle.handleError(res, {
        status: responseCode.UNAUTHORIZED,
        message: responseMessage.UNAUTHORIZED,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return responseHandle.handleError(res, {
      status: responseCode.UNAUTHORIZED,
      message: responseMessage.UNAUTHORIZED,
    });
  }
};
