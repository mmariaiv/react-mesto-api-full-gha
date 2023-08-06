const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getUserById,
} = require('../controllers/user');
const { regexLinkValidation } = require('../utils/constants');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', celebrate({
  params: {
    userId: Joi.string().hex().min(24),
  },
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexLinkValidation),
  }),
}), updateUserAvatar);

module.exports = router;
