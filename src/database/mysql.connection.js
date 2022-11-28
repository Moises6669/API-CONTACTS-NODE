const { sequelize } = require("../config/init");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connection");
  })
  .catch((err) => {
    console.log("Database connection error :", err);
  });

module.exports = sequelize;
