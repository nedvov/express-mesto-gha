const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError();
  }

  let payload;

  try {
    payload = jwt.verify(token, '8c9701e1290ceb57731ecf3947aaee3f0483484d241773445e2319d9c54fd042');
  } catch (err) {
    throw new AuthError();
  }

  req.user = payload;

  next();
};
