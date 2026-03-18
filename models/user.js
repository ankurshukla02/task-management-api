'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
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
      },
    },
    {
      tableName: 'users',
      timestamps: true,

      defaultScope: {
        attributes: { exclude: ['password'] },
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
