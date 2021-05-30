const { Sequelize } = require("sequelize");
const { database } = require("./config/index.config");

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
