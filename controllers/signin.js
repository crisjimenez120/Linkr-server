const express = require('express');
const models = require('../models');

const router = express.Router();


router.get("/api_register", (request, response) => { 
  models.user_data.findAll()
  .then(registrations => {
    response.send(registrations);
  });
});

// ---------------------[CONFIRMING THAT SIGNIN WORKS]---------------------
router.post("/api_signin", (request, response) => { 

  console.log("WE SIGNING IN MY MANS");

  models.user_data.findOne({
      where: 
      { 
        email: request.body.email 
      }
  }).then((results) => {

    if(results != null)
    {
      console.log("Here is the user we found: " + results.email);
      response.send(200);
    }
    else
    {
      console.log("HOMIE DOESN'T EXIST");
      response.status(400).json("ERROR! Please enter proper credentials.");
    }
  }).catch((error) => {
    console.log(error);
    response.status(400).json("ERROR! An error happened.");
  });

  /*
    // search for attributes
Project.findOne({ where: {title: 'aProject'} }).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
})
  */

});

module.exports = router;
