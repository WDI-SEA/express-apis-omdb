'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorites = sequelize.define('favorites', {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    imdbid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorites.hasMany(models.comment);
        models.favorites.belongsToMany(models.tag, {through: 'favoritesTags'});
      }
    }
  });
  return favorites;
};