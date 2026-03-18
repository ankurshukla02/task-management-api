const responseHandle = require('../helpers/responseHandle');
const responseMessage = require('../helpers/responseMessage');
const responseCode = require('../helpers/responseCode');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return responseHandle.handleError(res, {
        status: responseCode.FORBIDDEN,
        message: responseMessage.ROLE_UNAUTHORIZED,
      });
    }
    next();
  };
};
