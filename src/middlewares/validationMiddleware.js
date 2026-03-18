const responseHandle = require('../helpers/responseHandle');

module.exports = (schema, type = 'body') => {
  return (req, res, next) => {
    try {
      if (!schema) throw new Error('Schema is missing');
      const result = schema.safeParse(req[type]);
      if (!result.success) {
        const issues = result.error.issues || result.error.errors || [];
        return responseHandle.handleError(res, {
          status: 400,
          message: issues.map((e) => e.message).join(', '),
        });
      }
      next();
    } catch (err) {
      return responseHandle.handleError(res, {
        status: 500,
        message: err.message || 'Validation Middleware Error',
      });
    }
  };
};
