'use strict';
module.exports = function(sequelize, DataTypes) {
  var tagIdfavoriteId = sequelize.define('tagIdfavoriteId', {
    tagId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tagIdfavoriteId;
};