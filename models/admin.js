'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class Admin extends Model{}

  Admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    levelUser: DataTypes.STRING

  },{sequelize})

  // const Admin = sequelize.define('Admin', {
  // }, {});
  Admin.associate = function(models) {
    // associations can be defined here
    // Admin.hasMany(models.Pet, {fore})
  };
  return Admin;
};