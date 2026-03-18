const responseHandle = require('../helpers/responseHandle');
const responseMessage = require('../helpers/responseMessage');
const responseCode = require('../helpers/responseCode');

module.exports = (schema, type = 'body') => {
  return (req, res, next) => {
    try {
      if (!schema) throw new Error('Schema is missing');
      const result = schema.safeParse(req[type]);
      if (!result.success) {
        const issues = result.error.issues || result.error.errors || [];
        return responseHandle.handleError(res, {
          status: responseCode.BAD_REQUEST,
          message: issues.map((e) => e.message).join(', '),
        });
      }
      next();
    } catch (err) {
      return responseHandle.handleError(res, {
        status: responseCode.INTERNAL_SERVER_ERROR,
        message: err.message || responseMessage.INTERNAL_SERVER_ERROR,
      });
    }
  };
};
