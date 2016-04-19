'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    imdbID: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      models.favorite.hasMany(models.comment);
      models.favorite.belongsToMany(models.tag, {through: "tagsFavorites"});
      }
    }
  });
  return favorite;
};