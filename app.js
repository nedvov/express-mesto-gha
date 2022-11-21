const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

const emailPattern = /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/;
const linkPattern = /^https?:\/\/(www.)?[0-9a-zA-Z-._~:/?#[\]@!$&\\'()*+,;=]+/;

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(new RegExp(emailPattern)),
      password: Joi.string().required().min(2).max(30),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(new RegExp(emailPattern)),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(new RegExp(linkPattern)),
    }),
  }),
  createUser,
);

app.use('/', () => {
  throw new NotFoundError('Указанный путь не найден');
});

app.use(errors({ message: 'Ошибка. Переданы некорректные данные' }));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Приложение слушает на ${PORT} порте`);
});
