const express = require('express');
const models = require('../models');

const router = express.Router();

// -------------[Hard display of the users that are registered]---------------
router.get("/api_get_registration", (request, response) => {
  console.log("WE IN THAT REGISTRATION");

  models.user_data.findAll()
  .then(events => {
    response.send(events);
  });

});


// -------------[POST]---------------
// a user is registering
router.post("/api_registration", (request, response) => {

  console.log("WE REGISTRATING MY MANS");

  models.user_data.findAll({
    where:
    {
      email: request.body.email
    }
  })
  .then((results) => {

    if(results.length == 0){
      // console.log("we here");
      // console.log("WE'RE CREATING SOMEONE WITH THE EMAIL: " + request.body.email);
      models.user_data.create({

        user_name: request.body.name,
        email: request.body.email,
        password: request.body.password

      }).then( (new_user) => {
        console.log("WE MADE A NEW USER WITH EMAIL: " + new_user.email);

        response.send(new_user);
      });
    }
    else
    {
      console.log("SOMETHING WENT WRONG");
      response.status(400).json("ERROR! YOU ALREADY EXIST.");
    }

  });

});


module.exports = router;
