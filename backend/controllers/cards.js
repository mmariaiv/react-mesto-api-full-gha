const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ForbiddenAccessError = require('../errors/forbiddenAccessError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.putLikeOnCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send({ data: card.likes });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с веденным id не найдена'));
      } else if (err.name === 'CastError') {
        next(new ValidationError('Передана карточка с неккоректным id'));
      } else {
        next(err);
      }
    });
};

module.exports.removeLikeFromCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send({ data: card.likes });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с веденным id не найдена'));
      } else if (err.name === 'CastError') {
        next(new ValidationError('Передана карточка с неккоректным id'));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Передана карточка с неккоректным id'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findById(req.params.cardId).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с веденным id не найдена');
    } else if (userId === card.owner._id.toString()) {
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.status(200).send({ data: 'Карточка успешно удалена' });
        });
    } else {
      throw new ForbiddenAccessError('У вас нет прав на удаление данной карточки');
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Передана карточка с неккоректным id'));
      } else {
        next(err);
      }
    });
};
