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

    // title: "BEATING CRIS IN POKEMON",
    // start: "2018-11-15T08:00:00.000Z",
    // end: "2018-11-15T11:00:00.000Z"

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

  events.update(
  {
    start: "2999-12-21T08:00:00.000Z"
  },
  {
    where:
    {
      title: "BEATING CRIS IN POKEMON"
    }
  }).then((get) =>{
    response.redirect("/api_events");
  }).catch((error) => {
    console.log("ERROR while UPDATING Naruto's event");
  })
});

// -------------[DELETE]---------------
//basic route to REMOVE the mock entry
router.delete("/api_delete_event", (request, response) =>{
models.events.destroy({
    where: {
      title: "BEATING CRIS IN POKEMON"
    }
  })
  .then((get) => {
    response.redirect('/api_events');
  }).catch((err) => {
      console.log('ERROR while DELETEING a post for Nartuo');
    });
});


module.exports = router;