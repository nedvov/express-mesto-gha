const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { linkPattern } = require('../utils/patterns');

const {
  getUsers,
  getUserByUserId,
  updateUserByUserId,
  updateAvatarByUserId,
  getMe,
} = require('../controllers/users');

usersRouter.get('/', auth, getUsers);

usersRouter.get('/me', auth, getMe);
usersRouter.get(
  '/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().required().hex()
        .length(24),
    }),
  }),
  getUserByUserId,
);

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
      avatar: Joi.string().required().pattern(linkPattern),
    }),
  }),
  updateAvatarByUserId,
);

module.exports = usersRouter;
