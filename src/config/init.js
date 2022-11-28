const {sequelize} = require("./database.config");
const port = require("./app.keys");

module.exports = {
  sequelize,
  port,
};
