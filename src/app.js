const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes/api.routes"));

app.listen(process.env.PORT, () => {
  console.log("Server started on port ", process.env.PORT);
  require("./database/mysql.connection");
});
