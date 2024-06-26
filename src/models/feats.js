'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feats.init({
    featName: DataTypes.STRING,
    loadedElement: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'feats',
  });
  return feats;
};