const bodyParser = require("body-parser");
const passport = require("passport");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

//initialization
const app = express();

//Database
const sequelize = require("./database");

//env settings
require("./config/index.config");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
dotenv.config();

app.use(require("./routes/api.routes"));

//global variables
global.appRoot = __dirname;

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Server
app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado en el puerto ", process.env.PORT);
  // connection to the database
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Conexion con la base de datos");
    })
    .catch((err) => {
      console.log("Error en la conexion con la base de datos", err);
    });
});
