'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drugUsageAppointmentRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  drugUsageAppointmentRecords.init({
    drugUsageId: DataTypes.INTEGER,
    appointmentRecordId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'drugUsageAppointmentRecords',
  });
  return drugUsageAppointmentRecords;
};