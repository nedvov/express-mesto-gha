const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const { catchErrors } = require('../components/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => {
      catchErrors(
        err,
        res,
      );
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
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
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) throw new NotFoundError();
      return res.send(card);
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
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) throw new NotFoundError();
      return res.send(card);
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
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) throw new NotFoundError();
      return res.send(card);
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
