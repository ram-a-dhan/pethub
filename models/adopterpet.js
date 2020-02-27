'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdopterPet = sequelize.define('AdopterPet', {
    AdopterId: DataTypes.INTEGER,
    PetId: DataTypes.INTEGER
  }, {});
  AdopterPet.associate = function(models) {
    // associations can be defined here
  };
  return AdopterPet;
};