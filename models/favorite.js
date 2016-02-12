'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    imdbID: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    plot: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorite;
};