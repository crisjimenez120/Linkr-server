
router.get("/api_user_events", (req, res) => { 
  models.users.findOne({ // get the user
  	where: {email: req.body.email}
  }).then(res => { 
    models.users.findAll({ // get their events
    	where: {user_id: res.body.user_id}
    })
  }).then(events => { 
  	res.json(events);// send their api_user_events
  })
});