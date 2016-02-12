'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorites = sequelize.define('favorites', {
    title: DataTypes.STRING,
    imdbCode: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorites;
};