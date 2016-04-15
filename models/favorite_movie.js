'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite_movie = sequelize.define('favorite_movie', {
    imdb_id: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorite_movie;
};