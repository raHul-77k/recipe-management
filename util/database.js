const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('recipe-management', 'root', '@#MaD.772k', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;