const responseHandle = require('../helpers/responseHandle');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return responseHandle.handleError(res, { status: 403, message: 'Forbidden' });
    }
    next();
  };
};
