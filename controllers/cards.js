const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const { catchErrors } = require('../components/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) throw new NotFoundError();
      return res.send({ data: cards });
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Еще ни одна карточка не была создана',
        },
      );
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          validationMessage: 'Ошибка. Переданы некорректные данные при создании карточки',
        },
      );
    });
};

module.exports.removeCardByCardId = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) throw new NotFoundError();
      return res.send({ data: card });
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Запрашиваемая карточка не найдена',
          validationMessage: 'Ошибка. Передан некорректный идентификатор карточки',
        },
      );
    });
};

module.exports.likeCardByCardId = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) throw new NotFoundError();
      return res.send({ data: card });
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Запрашиваемая карточка не найдена',
          validationMessage: 'Ошибка. Передан некорректный идентификатор карточки',
        },
      );
    });
};

module.exports.removeLikeFromCardByCardId = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) throw new NotFoundError();
      return res.send({ data: card });
    })
    .catch((err) => {
      catchErrors(
        err,
        res,
        {
          notFoundMessage: 'Ошибка. Запрашиваемая карточка не найдена',
          validationMessage: 'Ошибка. Передан некорректный идентификатор карточки',
        },
      );
    });
};
