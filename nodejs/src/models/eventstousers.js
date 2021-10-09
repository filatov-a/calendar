'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventsToUsers extends Model {
    static associate(models) {
      eventsToUsers.belongsToMany(models.Users, {foreignKey: 'postId'})
      eventsToUsers.belongsToMany(models.Events, {foreignKey: 'eventId'})
    }
  };
  eventsToUsers.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' } },
    eventId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Events', key: 'id' } },
  }, {
    sequelize,
    modelName: 'eventsToUsers',
  });
  return eventsToUsers;
};
