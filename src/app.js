const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const multer = require('multer');

//unique id generator
const { v4: uuidv4 } = require('uuid');

//initialization
const app = express();

//Database
const sequelize = require('./database');

//env settings
require('./config/index.config');

//settings 
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    },
})
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
app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/images'),
    limits: { fieldSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|svg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("error: Archivo debe ser una imagen valida");
    }
}).single('image'))

dotenv.config();


//Routes
const usuario = require('./models/user.model');

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.post('/upload', (req, res) => {
    console.log(req.file);
    res.send('Upload')
})


app.use(require('./routes/api.routes'));

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