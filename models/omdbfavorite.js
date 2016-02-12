'use strict';
module.exports = function(sequelize, DataTypes) {
  var omdbFavorite = sequelize.define('omdbFavorite', {
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
  return omdbFavorite;
};