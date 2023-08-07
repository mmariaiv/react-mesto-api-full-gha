const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { regexLinkValidation } = require('../utils/constants');

const {
  getCards,
  createCard,
  putLikeOnCard,
  removeLikeFromCard,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexLinkValidation),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: {
    cardId: Joi.string().hex().min(24),
  },
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().hex().min(24),
  },
}), putLikeOnCard);

router.delete('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().hex().min(24),
  },
}), removeLikeFromCard);

module.exports = router;
