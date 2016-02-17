'use strict';
module.exports = function(sequelize, DataTypes) {
  var join = sequelize.define('join', {
    tagId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return join;
};