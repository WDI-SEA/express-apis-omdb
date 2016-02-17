'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    text: DataTypes.STRING,
    author: DataTypes.STRING,
    favoriteId: DataTypes.STRING
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