const express = require('express');
const models = require('../models');
const passport = require('../middleware/auth');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

/*
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/error' }), (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  });
*/
// ---------------------[CONFIRMING THAT SIGNIN WORKS]---------------------
router.post("/api_signin", (request, response) => { 

  console.log("WE SIGNING IN MY MANS");

  models.user_data.findOne({
      where: 
      { 
        email: request.body.email 
      }
  }).then((theuser) => {

    if(theuser != null){

      console.log(theuser);
      console.log("Here is the user we found: " + theuser);

      if (passwordsMatch(request.body.password, theuser.password) === false) {
        response.json("ERROR! Please enter proper credentials.");
      }

      response.send(theuser);
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

});

/*
function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}


if (passwordsMatch(password, user.password) === false) {
  return done(null, false, { message: 'Incorrect password.' });
}

return done(null, user, { message: 'Successfully Logged In!' });
*/


module.exports = router;
