const express = require('express');
const models = require('../models');

const router = express.Router();

router.get("/api_single_events", (request, response) => { 
 
	models.events.findAll({
		where:
		{
			user_id: request.body.user_id
		}
	}).then((allevents) => {
		if(allevents.length() != 0){
			response.json(allevents);
		}
		else{
			console.log("NO EVENTS FOR THIS USER");
			response.status(400).json("AINT NO EVENTS FOR THE HOMIE");
		}
	})

});


module.exports = router;


/*

need to edit the events table to include the ID of the user that created them

  ishs code below
  ---------------
  models.users.findOne({ // get the user
  	where: {email: req.body.email}
  }).then(res => { 
    models.users.findAll({ // get their events
    	where: {user_id: res.body.user_id}
    })
  }).then(events => { 
  	res.json(events);// send their api_user_events
  })
  
*/
