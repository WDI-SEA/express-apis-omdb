'use strict';
module.exports = function(sequelize, DataTypes) {
  var favoritesTags = sequelize.define('favoritesTags', {
    tagId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favoritesTags;
};