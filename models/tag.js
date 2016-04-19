'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    tag: DataTypes.STRING,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.tag.belongsToMany(models.favorite, {through: "favoritesTags"});
      }
    }
  });
  return tag;
};