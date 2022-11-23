const { databaseConfig } = require("../config/init");

databaseConfig
     .sync({ force: false })
     .then(() => {
          console.log("Database connection");
     })
     .catch((err) => {
          console.log("Database connection error", err);
     }); 

module.exports = databaseConfig;