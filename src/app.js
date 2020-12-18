const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

//initialization
const app = express();

//Database
const sequelize = require('./database');

//env settings
require('./config/index.config');

//Settings
app.set('views', path.join(__dirname,'views'))

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
dotenv.config();

app.use(require('./routes/api.routes'));
 

//global variables
global.appRoot = __dirname;

//Static files
app.use(express.static(path.join(__dirname, 'public')));


//Server
app.listen(process.env.PORT || 4000, () => {
    console.log('Server on PORT 4000');
    // connection to the database
    sequelize.sync({ force: false }).then(() => {
        console.log('connected database');
    }).catch((err) => {
        console.log('An error has occurred', err);
    })
})