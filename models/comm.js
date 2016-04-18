'use strict';
module.exports = function(sequelize, DataTypes) {
  var comm = sequelize.define('comm', {
    by: DataTypes.STRING,
    content: DataTypes.TEXT,
    favoriteId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.comm.belongsTo(models.favorite);
      }
    }
  });
  return comm;
};