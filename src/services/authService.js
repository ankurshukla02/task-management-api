const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseMessage = require('../helpers/responseMessage');
const responseCode = require('../helpers/responseCode');

/**
 * Authenticates a user and generates a JWT token.
 * @param {Object} param 
 * @returns {Promise<Object>}
 */
const login = async ({ email, password }) => {
  // Use unscoped to include password field excluded by defaultScope
  const user = await User.unscoped().findOne({ where: { email } });
  if (!user) {
    throw Object.assign(new Error(responseMessage.INVALID_CREDENTIALS), { status: responseCode.UNAUTHORIZED });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Object.assign(new Error(responseMessage.INVALID_CREDENTIALS), { status: responseCode.UNAUTHORIZED });
  }
  // Include role in JWT so roleMiddleware can authorize correctly
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
  return { token };
};

module.exports = { login };
