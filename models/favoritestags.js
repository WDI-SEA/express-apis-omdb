'use strict';
module.exports = function(sequelize, DataTypes) {
  var favoritesTags = sequelize.define('favoritesTags', {
    favoriteId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
       
      }
    }
  });
  return favoritesTags;
};