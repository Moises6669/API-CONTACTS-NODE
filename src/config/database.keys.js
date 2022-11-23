const { database } = require("./index.config");

module.exports = {
     database: process.env.DATABASE,
     username: process.env.USERNAME,
     host: process.env.HOST,
     password: process.env.PASSWORD,
     dialect: "mysql",
     logging: false,
}