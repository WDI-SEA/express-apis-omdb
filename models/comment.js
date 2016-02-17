'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    author: DataTypes.STRING,
    body: DataTypes.TEXT,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.omdbFavorite, {foreignKey: 'favoriteId'});
      }
    }
  });
  return comment;
};