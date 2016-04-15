'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorites = sequelize.define('favorites', {
    imdbCode: DataTypes.STRING,
    title: DataTypes.STRING,
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