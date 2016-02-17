'use strict';
module.exports = function(sequelize, DataTypes) {
  var tagsFavorites = sequelize.define('tagsFavorites', {
    tagId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tagsFavorites;
};