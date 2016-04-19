'use strict';
module.exports = function(sequelize, DataTypes) {
  var commentt = sequelize.define('commentt', {
    author: DataTypes.STRING,
    comment: DataTypes.TEXT,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      models.commentt.belongsTo(models.favorites);
      }
    }
  });
  return commentt;
};