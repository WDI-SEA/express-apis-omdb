'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    favoriteId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.favorite);
      }
    }
  });
  return comment;
};