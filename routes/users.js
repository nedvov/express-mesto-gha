const usersRouter = require('express').Router();
const {
  getUsers,
  getUserByUserId,
  createUser,
  updateUserByUserId,
  updateAvatarByUserId,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserByUserId);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUserByUserId);
usersRouter.patch('/me/avatar', updateAvatarByUserId);

module.exports = usersRouter;
