"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointmentList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      appointmentList.hasMany(models.appointmentListPatient, {
        foreignKey: "appointmentListId",
      });
      appointmentList.hasMany(models.bills, {
        foreignKey: "appointmentListId",
      });
      appointmentList.hasMany(models.appointmentRecords, {
        foreignKey: "appointmentListId",
      });
    }
  }
  appointmentList.init(
    {
      scheduleDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "appointmentList",
    }
  );
  return appointmentList;
};
