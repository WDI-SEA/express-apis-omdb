'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    IMDBCode: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      // associate: function(models) {
      //  models.favorite.hasMany(models.post);
      }
    // }
  });
  return favorite;
};