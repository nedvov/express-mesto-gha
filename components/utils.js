const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const CommonError = require('../errors/CommonError');

module.exports.catchErrors = (err, res, { notFoundMessage, validationMessage, commonMessage }) => {
  if (err.name === 'NotFoundError') {
    const error = new NotFoundError(notFoundMessage);
    res.status(error.statusCode).send({ message: error.message });
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    const error = new ValidationError(validationMessage);
    res.status(error.statusCode).send({ message: error.message });
  } else {
    const error = new CommonError(commonMessage);
    res.status(error.statusCode).send({ message: error.message });
  }
};
