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
    models.Posts.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then((posts) => {
        res.render('posts', { posts });
      });
  },
  create(req, res) {
    //the issue is here, how do we split two forms
    models.Posts.create({
      first: req.body.first,
      last: req.body.last
    })
    .then((post) => {
      res.redirect('/posts');
    })
    .catch((err) => {
      console.log('ERROR while creating a new post');
      res.redirect('/error');
    })

    console.log(req);
  }
};

module.exports = PostsController.registerRouter();
