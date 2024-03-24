'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointmentRecordDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  appointmentRecordDetails.init({
    appointmentRecordId: DataTypes.INTEGER,
    drugId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    usageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'appointmentRecordDetails',
  });
  return appointmentRecordDetails;
};