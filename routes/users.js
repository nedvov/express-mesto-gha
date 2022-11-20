const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserByUserId,
  updateUserByUserId,
  updateAvatarByUserId,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', auth, getUserByUserId);

usersRouter.patch(
  '/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserByUserId,
);

usersRouter.patch(
  '/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(new RegExp('^https?://(www.)?[0-9a-zA-Z-./?&#]+'))
    }),
  }),
  updateAvatarByUserId,
);

module.exports = usersRouter;
