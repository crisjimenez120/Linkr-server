var Express = require("express");		//Using express
var Sequelize = require("sequelize");	//Using sequelize
// var models = require('../models');

//Assuming we're connected to "linkr_development" database
var sequelize = new Sequelize('postgres://linkr:password@localhost:5432/linkr_development');
var app = Express();	// the express "object" we're using to call routes

var PORT = process.env.PORT || 3001;	//port we usin


//a simple authentication check, to make sure we in dat ass
sequelize.authenticate() .then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// sequelize.sync({ force: false })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is up and running on port: ${PORT}`)
//     });
//   });

//-------------------------[Models]----------------------------


var users = sequelize.define ('users', {
		user_id: {type: Sequelize.INTEGER, primaryKey: true},
		user_name: Sequelize.STRING,
	    password: Sequelize.STRING
});

var events = sequelize.define ('events', {
		title: Sequelize.STRING,
		start_date: Sequelize.DATE,
		end_date: Sequelize.DATE
});

var groups = sequelize.define ('groups', {
		group_id: Sequelize.INTEGER,
		user_id: Sequelize.INTEGER,
		group_name: Sequelize.STRING,
		admin: Sequelize.BOOLEAN
});

//NEED TO SYNC TO UPDATE TABLE
// events.sync();

//----------------------[Controllers]---------------------------
//----------------------[CRUD]---------------------------
app.get("/", (request, response) => {
	response.send("IT WORKS");
})

//basic route to make sure that shit not hit
app.get("/api_events", (request, response) => { 

	events.findAll()
	.then(events => {
	  response.send(events);
	});
});

//basic route to ADD a mock entry
app.get("/api_create", (request, response) =>{
/*
		{id: 3, title: "Beat All The Gyms", start: "2018-11-15T08:00:00.000Z", end: "2018-11-15T11:00:00.000Z"}
		{id: 3, title: "Beat All The Gyms", start: "2018-11-15T08:00:00.000Z", end: "2018-11-15T11:00:00.000Z"}
*/
	events.create({
		title: "BEATING CRIS IN POKEMON",
		start_date: "2018-11-15T08:00:00.000Z",
		end_date: "2018-11-15T11:00:00.000Z",
	}).then((get) => {
	  response.redirect('/');
	}).catch((err) => {
      console.log(err);
    });

	// response.json({
	// 	example: "this is the example"
	// });
});


//-------------------------need to update it------------
//basic route to REMOVE the mock entry
app.get("/api_delete", (request, response) =>{

	events.destroy({
		where: {
			title: "FUCKING ISH"
		}
	}).then((get) => {
	  response.redirect('/');
	}).catch((err) => {
      console.log('ERROR while DELETEING a post for Nartuo');
    });

	// response.json({
	// 	example: "this is the example"
	// });
});

app.get("/api_update", (request, response) =>{

	users.update(
	{
		event_name: "MY PARENTS ARE DEAD"
	},
	{
		where:
		{
			user_name: "Naruto"
		}
	}).then((get) =>{
		response.redirect("/");
	}).catch((error) => {
		console.log("ERROR while UPDATING Naruto's event");
	})

	// response.json({
	// 	example: "this is the example"
	// });
});


//the app is listening on port XXXX
app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});
//----------------------[Controllers]---------------------------



