const { Sequelize } = require('sequelize');

const { DB_CONNECTION_URI } = process.env;

const sequelize = new Sequelize(DB_CONNECTION_URI);

module.exports = sequelize;