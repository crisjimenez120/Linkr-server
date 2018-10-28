const express = require('express');
const models = require('../models');

const PostsController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/data', this.users);
    router.post('/', this.create);

    return router;
  },
  users(request, response){
    models.users.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    }).then((users) => { response.json(users); } )
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
      user_name: req.body.user_name,
      event_name: req.body.event_name,
      date: req.body.date,
      time_start: req.body.time_start,
      time_end: req.body.time_end
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
