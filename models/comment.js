'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    comments: DataTypes.TEXT,
    author: DataTypes.STRING,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
         models.comment.belongsTo(models.favorite);
      }
    }
  });
  return comment;
};