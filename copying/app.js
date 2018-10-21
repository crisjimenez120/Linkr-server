//Saif Shakur 10/21/2018
//Going to comment as I go about understanding the code
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const models = require('./models');

const PORT = process.env.PORT || 8000;


const app = express();


// Setup the body-parser and handlebars middleware packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);


// The controllers contain all routing
app.use(require('./controllers'));



models.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  })


