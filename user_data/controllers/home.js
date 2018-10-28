const express = require('express');
const models = require('../models');

const HomeController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);

    return router;
  },
  index(req, res) {
    res.redirect('/users')
  }
};

module.exports = HomeController.registerRouter();
