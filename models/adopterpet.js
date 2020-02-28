'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdopterPet = sequelize.define('AdopterPet', {
    AdopterId: DataTypes.INTEGER,
    PetId: DataTypes.INTEGER
  }, {});
  AdopterPet.associate = function(models) {
    // associations can be defined here
    AdopterPet.belongsTo(models.Adopter , {foreignKey:'AdopterId'})
    AdopterPet.belongsTo(models.Pet , {foreignKey:'PetId'})
  };
  return AdopterPet;
};