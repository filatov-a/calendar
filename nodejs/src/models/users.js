'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Events, {through: 'eventsToUsers', foreignKey: "userId"});
    }
  };
  Users.init({
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    full_name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    profile_picture: DataTypes.TEXT,
    role: DataTypes.ENUM(['user', 'admin']),
    isVerified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
