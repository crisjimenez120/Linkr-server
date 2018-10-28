const express = require('express');
const models = require('../models');

const PostsController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.create);

    return router;
  },
  index(req, res) {
    models.users.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then((users) => {
      res.render('users', { users });
    });
  },
  create(req, res) {

    models.users.create({
      first: req.body.first,
      last: req.body.last,
      day: req.body.day,
      event_start: req.body.event_start,
      event_end: req.body.event_end
    })
    .then((post) => {
      res.redirect('/users');
    })
    .catch((err) => {
      console.log('ERROR while creating a new post');
      res.redirect('/error');
    })
  }
};

module.exports = PostsController.registerRouter();
