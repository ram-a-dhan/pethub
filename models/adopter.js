'use strict';
module.exports = (sequelize, DataTypes) => {
  const Adopter = sequelize.define('Adopter', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    hasTakenQuiz: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    isIndependent: DataTypes.BOOLEAN,
    isSpacious: DataTypes.BOOLEAN,
    isFriendly: DataTypes.BOOLEAN,
    levelUser: DataTypes.STRING
  }, {});
  Adopter.associate = function(models) {
    // associations can be defined here
    Adopter.belongsToMany(models.Pet, {through :'AdopterPet'})
  };
  return Adopter;
};