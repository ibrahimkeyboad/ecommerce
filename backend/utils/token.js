const jwt = require('jsonwebtoken');

function token(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 30,
  });
}

module.exports = token;
