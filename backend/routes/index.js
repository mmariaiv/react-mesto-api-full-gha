const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./user');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res) => {
  res
    .status(404)
    .send({ message: 'Был запрошен несуществующий роут' });
});

module.exports = router;
