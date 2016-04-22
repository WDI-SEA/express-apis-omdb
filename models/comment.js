'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    favoriteID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      models.favorite.belongsTo(models.favorite);
      }
    }
  });
  return comment;
};

