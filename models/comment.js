'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    comment: DataTypes.STRING,
    favoriteId: DataTypes.INTEGER,
    comment_author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.favorites);
      }
    }
  });
  return comment;
};