'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tags = sequelize.define('Tags', {
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tags;
};