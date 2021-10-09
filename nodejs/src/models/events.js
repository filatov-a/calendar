'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsToMany(models.Users, {through: 'eventsToUsers', foreignKey: "eventId"});
    }
  };
  Events.init({
    name: DataTypes.TEXT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    descriptions: DataTypes.TEXT,
    isActive: DataTypes.BOOL,
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};
