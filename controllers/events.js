const express = require('express');
const models = require('../models');

const router = express.Router();

// -------------[TESTING CONNECTION]---------------
router.get("/", (request, response) => {
  console.log("IT WORKS");
})

// -------------[GET]---------------
router.post("/api_events", (request, response) => { 

  models.events.findAll({
    where:
    {
      user_email: request.body.user_email
    }
  }).then(events => {
    response.send(events);
  });
});

// -------------[POST]---------------
//basic route to ADD a mock entry
router.post("/api_create_event", (request, response) => {

  console.log("WE IN IT");

  models.events.create({

    title: request.body.title,
    start: request.body.start,
    end: request.body.end,
    user_email: request.body.user_email
    
  }).then((get) => {
    //response.redirect('/api_events');
    console.log("SUCCESS, WE ADDED A USER MADE THING");
    response.send(200);
  }).catch((err) => {
      console.log(err);
    });
});

// -------------[PUT]---------------
router.put("/api_update_event", (request, response) =>{

  models.events.update(
  {
    title: request.body.title,
    start: request.body.start,
    end: request.body.end
  },
  {
    where: // match based on the user's id //
    {
      id: request.body.id
    }
  }).then((get) =>{
    //response.redirect("/api_events");
    console.log ("UPdate done?")
    response.send(200);
  }).catch((error) => {
    console.log("ERROR while updating the requested event");
  })
});

// -------------[DELETE]---------------

//basic route to REMOVE the mock entry

router.delete("/api_delete_event", (request, response) => {
  models.events.destroy({
    where: {
		id: request.body.id
    }
  }).then((get) => {
    console.log ("Delete done?")
    response.send(200);
  }).catch((err) => {
      console.log('ERROR while deleting the requested event');
  });
});


module.exports = router;
