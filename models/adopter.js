'use strict';
module.exports = (sequelize, DataTypes) => {
  const { emptyFields } = require('../helpers/emptyFields')
  const Sequelize= sequelize.Sequelize
  const Model = Sequelize.Model
  class Adopter extends Model{

    hello(){
      let msg=`Welcome ${this.name}, how are you doing? `
      return msg
    }
  }

  Adopter.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    hasTakenQuiz: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    isIndependent: DataTypes.BOOLEAN,
    isSpacious: DataTypes.BOOLEAN,
    isFriendly: DataTypes.BOOLEAN,
    levelUser: DataTypes.STRING
  },{sequelize, validate: {
    emptyFields: function() {
      if (emptyFields([this.username, this.password, this.email, this.name, this.address])) {
        throw new Error('Isi dong semuanya!');
      }
    }
  },
  hooks: {
    beforeSave: (newAdopter) => {
      newAdopter.hasTakenQuiz = false,
      newAdopter.isIndependent = null,
      newAdopter.isSpacious = null,
      newAdopter.isFriendly = null,
      newAdopter.levelUser = 'User'
    }
  },})


  // const Adopter = sequelize.define('Adopter', {
  //   // username: DataTypes.STRING,
  //   // password: DataTypes.STRING,
  //   // hasTakenQuiz: DataTypes.BOOLEAN,
  //   // name: DataTypes.STRING,
  //   // address: DataTypes.STRING,
  //   // isIndependent: DataTypes.BOOLEAN,
  //   // isSpacious: DataTypes.BOOLEAN,
  //   // isFriendly: DataTypes.BOOLEAN,
  //   // levelUser: DataTypes.STRING
  // }, 
  // {
  //   validate: {
  //     emptyFields: function() {
  //       if (emptyFields([this.username, this.password, this.name, this.address])) {
  //         throw new Error('Isi dong semuanya!');
  //       }
  //     }
  //   },
  //   hooks: {
  //     beforeSave: (newAdopter) => {
  //       newAdopter.hasTakenQuiz = false,
  //       newAdopter.isIndependent = null,
  //       newAdopter.isSpacious = null,
  //       newAdopter.isFriendly = null,
  //       newAdopter.levelUser = 'User'
  //     }
  //   },
  // });
  Adopter.associate = function(models) {
    // associations can be defined here
    Adopter.belongsToMany(models.Pet, {through :'AdopterPet'})
    Adopter.hasMany(models.AdopterPet, {foreignKey:'AdopterId'})
  };
  return Adopter;
};