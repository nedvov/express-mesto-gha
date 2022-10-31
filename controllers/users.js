const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { catchErrors } = require('../utils/catchErrors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      catchErrors(
        err,
        res,
      );
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          validationMessage: 'Ошибка. Переданы некорректные данные при создании пользователя',
        },
      );
    });
};

module.exports.getUserByUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user === null) throw new NotFoundError();
      else res.send(user);
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Запрашиваемый пользователь не найден',
          validationMessage: 'Ошибка. Передан некорректный идентификатор пользователя',
        },
      );
    });
};

module.exports.updateUserByUserId = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!name || !about) throw new ValidationError();
      else if (user === null) throw new NotFoundError();
      else res.send(user);
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Запрашиваемый пользователь не найден',
          validationMessage: 'Ошибка. Переданы некорректные данные при обновлении пользователя',
        },
      );
    });
};

module.exports.updateAvatarByUserId = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!avatar) throw new ValidationError();
      else if (user === null) throw new NotFoundError();
      else res.send(user);
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Запрашиваемый пользователь не найден',
          validationMessage: 'Ошибка. Переданы некорректные данные при обновлении аватара',
        },
      );
    });
};
