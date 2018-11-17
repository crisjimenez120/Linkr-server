const express = require('express');
const models = require('../models');

const PostsController = {
  registerRouter() {
    const router = express.Router();
    router.get('/', this.index);              //display the user data from database
    router.get('/data', this.users);          //json of user data
    router.post('/', this.create);            //create
    router.post('/delete', this.delete_user); //delete
    router.post('/update', this.update); // WHY DID THIS NEED TO BE POST INSTEAD OF PUT
    return router;
  },
  delete_user(request, response){

    console.log("WE CALLED DELETE");
    let temp = request.body.user_name;

    models.users.destroy({
      where: {
        user_name: temp
      }
    })
    .then((post) => {
      response.redirect('/users');
    })
  },
  users(request, response){
    models.users.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    }).then((users) => { response.json(users); } ) //can do response.send
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
  create(req, res) { // used to create new entries via the create form //
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
  },

  update(req, res) { //  used to update entries via the update form //
    models.users.update(
    {
      user_name: req.body.user_name,
      event_name: req.body.event_name,
      date: req.body.date,
      time_start: req.body.time_start,
      time_end: req.body.time_end
    },
    {
      where: {user_name: req.body.user_name}
    })
    .then ((post) => {
      res.redirect('/users');
    })
    .catch ((err) => {
      console.log('ERROR while updating a post');
      res.redirect('/error');
    })
  }


};

module.exports = PostsController.registerRouter();
