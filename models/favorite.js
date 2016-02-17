'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    imdbId: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.hasMany(models.comment);
        models.favorite.belongsToMany(models.tag, {through: 'favoritesTags'});
      }
    }
  });
  return favorite;
};