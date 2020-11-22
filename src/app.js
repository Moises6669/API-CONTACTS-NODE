const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
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
app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'))

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
dotenv.config();


//Routes
app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.post('/upload', (req, res) => {
    console.log(req.file);
    res.send('Upload')
})
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