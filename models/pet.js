'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    isIndependent: DataTypes.BOOLEAN,
    isSpacious: DataTypes.BOOLEAN,
    isFriendly: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    picture:DataTypes.STRING,
    gender:DataTypes.STRING,
    contactNumber:DataTypes.STRING,
    age:DataTypes.INTEGER
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsToMany(models.Adopter, {through :'AdopterPet'})
    Pet.hasMany(models.AdopterPet, {foreignKey:'PetId'})
  };
  return Pet;
};