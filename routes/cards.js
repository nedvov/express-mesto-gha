const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getCards,
  removeCardByCardId,
  createCard,
  likeCardByCardId,
  removeLikeFromCardByCardId,
} = require('../controllers/cards');

cardsRouter.get('/', auth, getCards);
cardsRouter.delete('/:cardId', auth, removeCardByCardId);
cardsRouter.post(
  '/',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(new RegExp('^https?://(www.)?[0-9a-zA-Z-./?&#]+')),
    }),
  }),
  createCard,
);
cardsRouter.put(
  '/:cardId/likes',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  likeCardByCardId,
);
cardsRouter.delete(
  '/:cardId/likes',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  removeLikeFromCardByCardId,
);

module.exports = cardsRouter;
