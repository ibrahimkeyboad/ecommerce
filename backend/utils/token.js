const jwt = require('jsonwebtoken');

function token(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = token;
