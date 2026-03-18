'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD'),
        allowNull: true,
      },

      priority: {
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
        allowNull: true,
      },

      assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'tasks',
      timestamps: true,
    },
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignee',
    });

    Task.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator',
    });
  };

  return Task;
};
