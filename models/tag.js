'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    name: DataTypes.TEXT,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tag.belongsToMany(models.favorite, {through: 'favoritesTags'});
      }
    }
  });
  return tag;
};