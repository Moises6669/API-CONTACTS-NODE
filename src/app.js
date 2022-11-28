const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require('path')

const app = express();

const {port} = require('./config/init')

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes/api.routes"));

app.listen(port, () => {
  console.log("Server started on port ", port);
  require("./database/mysql.connection");
});
