const Sequelize = require("sequelize");
const connection = require("../database/database");

const Company = connection.define('tab_company', {
  descricao:{
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

Company.sync({force: false}).then(() => {
  console.log("Tabela de empresas criada com sucesso!");
});

module.exports = Company;
