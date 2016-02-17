'use strict';
module.exports = function(sequelize, DataTypes) {
  var favoritessTags = sequelize.define('favoritessTags', {
    favoriteId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favoritessTags;
};