const {Sequelize} = require("sequelize");
const databaseSetup = require("./database.keys");

const sequelize = new Sequelize({
     database: databaseSetup.database,
     username: databaseSetup.username,
     host: databaseSetup.host,
     password: databaseSetup.password,
     dialect: databaseSetup.dialect,
     logging: databaseSetup.logging
});

module.exports = {sequelize};