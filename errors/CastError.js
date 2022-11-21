class CastError extends Error {
  constructor(message = 'Ошибка. Передан некорректныq идентификатор...') {
    super(message);
    this.name = 'CastError';
    this.statusCode = 400;
  }
}

module.exports = CastError;
