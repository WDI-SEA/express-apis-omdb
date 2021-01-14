'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fav extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fav.init({
    title: DataTypes.STRING,
    omdbID: DataTypes.STRING,
    imgURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fav',
  });
  return fav;
};