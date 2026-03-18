const authService = require('../services/authService');
const responseHandle = require('../helpers/responseHandle');

// Controller for user authentication (login)
const login = async (req, res) => {
  try {
    console.log("here------------------", req.body);
    const data = await authService.login(req.body);
    return responseHandle.handleData(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

module.exports = {
  login,
};