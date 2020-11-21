const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const dotenv = require('dotenv');

const sequelize = require('./database');
const app = express();

require('./config/index.config');

//settings 
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
const usuario = require('./models/user.model');

app.get('/', (req, res) => {
    // res.render('index.hbs');

     usuario.create({
         name:'ELIEL',
         email:"ELIEL21@gmail.com",
         password:'12314'
     }).then(user => res.json(user));
})

app.use(require('./routes/api.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server
app.listen(process.env.PORT || 4000, () => {
    console.log('Server on PORT 4000');

    // connection to the database
    sequelize.sync({force:false}).then(()=>{
        console.log('connected database');
    }).catch((err)=>{
        console.log('An error has occurred',err);
    })
})