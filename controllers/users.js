const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { catchErrors } = require('../components/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) throw new NotFoundError();
      return res.send({ data: users });
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Еще ни один пользователь не был создан',
        },
      );
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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
      return res.send({ data: user });
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
      if (user === null) throw new NotFoundError();
      if (!name || !about) throw new ValidationError();
      return res.send({ data: user });
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
      if (user === null) throw new NotFoundError();
      if (!avatar) throw new ValidationError();
      return res.send({ data: user });
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
