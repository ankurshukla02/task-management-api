'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
        allowNull: false,
        defaultValue: 'USER',
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: 'assignedTo',
      as: 'assignedTasks',
    });

    User.hasMany(models.Task, {
      foreignKey: 'createdBy',
      as: 'createdTasks',
    });
  };

  return User;
};
