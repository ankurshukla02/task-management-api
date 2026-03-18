const responseHandle = require('../helpers/responseHandle');

module.exports = (err, req, res, next) => {
  return responseHandle.handleError(res, err);
};
