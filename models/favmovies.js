'use strict';
module.exports = function(sequelize, DataTypes) {
  var favMovies = sequelize.define('favMovies', {
    imdb_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favMovies;
};