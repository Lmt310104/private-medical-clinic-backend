'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointmentListPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  appointmentListPatient.init({
    appointmentListId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    orderNumber: DataTypes.INTEGER,
    timeUpdate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'appointmentListPatient',
  });
  return appointmentListPatient;
};