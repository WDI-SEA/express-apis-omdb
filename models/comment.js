'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    author: DataTypes.STRING,
    comment: DataTypes.TEXT,
    favoriteId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.comment.belongsTo(models.favorites)
      }
    }
  });
  return comment;
};