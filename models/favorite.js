'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    imdbID: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.hasMany(models.comment);
        // associations can be defined here
      }
    }
  });
  return favorite;
};