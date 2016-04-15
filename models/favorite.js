'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    omdbid: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorite;
};