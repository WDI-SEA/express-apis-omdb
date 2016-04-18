'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    imdbId: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.post.hasMany(models.comment);
      }
    }
  });
  return favorite;
};