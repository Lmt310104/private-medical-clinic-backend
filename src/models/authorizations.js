'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authorizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  authorizations.init({
    userGroupId: DataTypes.INTEGER,
    featId: DataTypes.INTEGER,
    isAccess: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'authorizations',
  });
  return authorizations;
};