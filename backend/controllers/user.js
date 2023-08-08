const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const UnauthorizedError = require('../errors/unathorizedError');
const ConflictError = require('../errors/conflictError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({
      data: users.map((user) => {
        const newUser = {
          email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
        };
        return newUser;
      }),
    }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      if (!user) {
        throw new ValidationError('Переданы некорректные данные в метод создания пользователя');
      }
      res.status(201).send({
        email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы неккоректные данные в метод создания пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Этот email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      } else {
        res.status(200).send({
          email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Был передан неккоректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      } else {
        res.status(200).send({
          email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Был передан неккоректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const newData = {};

  if (req.body.name) {
    const { name } = req.body;

    newData.name = name;
  }

  if (req.body.about) {
    const { about } = req.body;

    newData.about = about;
  }

  User.findByIdAndUpdate(req.user._id, newData, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send({
        email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при смене информации о пользователе'));
      } else if (err.name === 'CastError') {
        next(new ValidationError('Переданы неккоректные данные'));
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send({
        email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при смене аватара'));
      } else if (err.name === 'CastError') {
        next(new ValidationError('Был передан неккоректный id'));
      } else {
        next(err);
      }
    });
};
