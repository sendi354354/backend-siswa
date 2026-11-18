const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST || process.env.MYSQL_HOST || 'localhost';
const dbPort = process.env.DB_PORT || process.env.MYSQL_PORT || 3306;
const dbUser = process.env.DB_USER || process.env.MYSQL_USER || 'root';
const dbPass = process.env.DB_PASS !== undefined ? process.env.DB_PASS : (process.env.MYSQL_PASSWORD || '');
const dbName = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'db_siswa';

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: Number(dbPort),
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
