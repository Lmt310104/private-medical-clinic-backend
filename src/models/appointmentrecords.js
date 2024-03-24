'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointmentRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  appointmentRecords.init({
    patientId: DataTypes.INTEGER,
    symptoms: DataTypes.STRING,
    diseaseId: DataTypes.STRING,
    appointmentListId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'appointmentRecords',
  });
  return appointmentRecords;
};