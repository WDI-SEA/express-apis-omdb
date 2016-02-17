'use strict';
module.exports = function(sequelize, DataTypes) {
  var tags = sequelize.define('tags', {
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tags.belongsToMany(models.favorites, {through: "tagsFavorites"})
      }
    }
  });
  return tags;
};