'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookingAppointmentList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookingAppointmentList.init({
    bookingDate: DataTypes.DATE,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthYear: DataTypes.INTEGER,
    address: DataTypes.STRING,
    bookingAppointment: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookingAppointmentList',
  });
  return bookingAppointmentList;
};