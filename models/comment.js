'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    comment: DataTypes.TEXT,
    name: DataTypes.STRING,
    favoriteId: DataTypes.INTEGER
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