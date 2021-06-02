const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");

//Inicialización
const app = express();

//Conexion con la base de datos
const sequelize = require("./database");

//Variables de entorno -> Configuraciones
require("./config/index.config");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
dotenv.config();

app.use("/api", require("./routes/api.routes"));

//global variables
global.appRoot = __dirname;

//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//Escuchando al server
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
