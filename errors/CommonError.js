class CommonError extends Error {
  constructor(message = 'Ошибка. Что-то пошло не так...') {
    super(message);
    this.name = 'CommonError';
    this.statusCode = 500;
  }
}

module.exports = CommonError;
