const authService = require('../services/authService');
const responseHandle = require('../helpers/responseHandle');

/**
 * Logs in a user and generates a JWT token.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    return responseHandle.handleData(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

module.exports = {
  login,
};
