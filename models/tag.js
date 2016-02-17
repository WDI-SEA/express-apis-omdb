'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tag.belongsTo(models.favorite, {through: 'favoritesTags'});
      }
    }
  });
  return tag;
};