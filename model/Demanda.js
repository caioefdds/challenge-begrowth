const Sequelize = require("sequelize");
const connection = require("../database/database");
const Company = require("../model/Company");
const User = require("../model/User");

const Demanda = connection.define('tab_demanda', {
  descricao:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  id_entregador:{
    type: Sequelize.INTEGER,
    allowNull: true
  },
  data_validade:{
    type: Sequelize.TEXT,
    allowNull: true
  },
  local_entrega:{
    type: Sequelize.TEXT,
    allowNull: true
  },
  status:{
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

Demanda.belongsTo(Company);
Demanda.belongsTo(User, {foreignKey: 'id_entregador'});

Demanda.sync({force: false}).then(() => {
  console.log("Tabela Demanda criada com sucesso!");
});

module.exports = Demanda;
