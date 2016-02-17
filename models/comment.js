'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    text: DataTypes.STRING,
    author: DataTypes.STRING,
    imdbCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.favorite, {foreignKey: 'imdbCode'});
      }
    }
  });
  return comment;
};