'use strict';

const sequelizeLib = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../src/config/config')[env];
const db = {};

const sequelize = new sequelizeLib(
  config.database,
  config.username,
  config.password,
  config,
);

// Load models
db.User = require('./user')(sequelize, sequelizeLib.DataTypes);
db.Task = require('./task')(sequelize, sequelizeLib.DataTypes);

// Run associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelizeLib;

module.exports = db;
