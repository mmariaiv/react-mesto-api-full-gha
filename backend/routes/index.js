const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./user');
const NotFoundError = require('../errors/notFoundError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});

module.exports = router;
