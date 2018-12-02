var Express = require("express");		//Using express
var Sequelize = require("sequelize");	//Using sequelize
// var models = require('../models');

//Assuming we're connected to "linkr_development" database
var sequelize = new Sequelize('postgres://linkr:password@localhost:5432/linkr_development');
var app = Express();	// the express "object" we're using to call routes

var PORT = process.env.PORT || 3001;	//port we usin
const models = require('./models');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./controllers'));


//a simple authentication check, to make sure we in dat ass
sequelize.authenticate() .then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


models.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  });

//PopulateMockData(); // populate mock data

function PopulateMockData () {
	console.log ("Called");
	models.user_data.create({
		user_name: "Saif Shakur",
		email: "email@email.com",
		password: "password"
	});
	models.user_data.create ({
		user_name: "Ismail Kheir",
		email: "ish@ish.com",
		password: "password"
	});
}


//----------------------[Controllers]---------------------------


