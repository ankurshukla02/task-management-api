const responseHandle = require('../helpers/responseHandle');

module.exports = (schema, type = 'body') => {
  return (req, res, next) => {
    const result = schema.safeParse(req[type]);
    if (!result.success) {
      return responseHandle.handleError(res, {
        status: 400,
        message: result.error.errors.map((e) => e.message).join(', '),
      });
    }
    next();
  };
};
