'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorites = sequelize.define('favorites', {
    imdbid: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      models.favorites.hasMany(models.commentt);
      models.favorites.belongsToMany(models.tag, {through: "tagIdfavoriteId"});
      }
    }
  });
  return favorites;
};