const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { regexLinkValidation } = require('./utils/constants');

const { PORT, DB_ADDRESS } = process.env;

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://m.mmariaiv.nomoreparties.co'], credentials: true }));

mongoose.connect(DB_ADDRESS, {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexLinkValidation),
  }),
}), createUser);

app.use(auth);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());
console.log(errors);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Application is running on port: ${PORT}`);
});
