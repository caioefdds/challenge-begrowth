const Sequelize = require("sequelize");

const conn = new Sequelize("delivery", "admin", "123456", {
  host: "localhost",
  dialect: 'mysql'
});

module.exports = conn;
