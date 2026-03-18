const jwt = require('jsonwebtoken');
const responseHandle = require('../helpers/responseHandle');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return responseHandle.handleError(res, { status: 401, message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return responseHandle.handleError(res, { status: 401, message: 'Unauthorized' });
  }
};
