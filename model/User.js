const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('tab_user', {
  nome:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  email:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  password:{
    type: Sequelize.TEXT,
    allowNull: false
  }
});

User.sync({force: false}).then(() => {
  console.log("Tabela de usuários criada com sucesso!");
});

module.exports = User;
