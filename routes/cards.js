const cardsRouter = require('express').Router();
const {
  getCards,
  removeCardByCardId,
  createCard,
  likeCardByCardId,
  removeLikeFromCardByCardId,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', removeCardByCardId);
cardsRouter.post('/', createCard);
cardsRouter.put('/:cardId/likes', likeCardByCardId);
cardsRouter.delete('/:cardId/likes', removeLikeFromCardByCardId);

module.exports = cardsRouter;
