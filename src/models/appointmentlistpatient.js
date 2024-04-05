"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointmentListPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      appointmentListPatient.belongsTo(models.appointmentList, {
        foreignKey: "appointmentListId",
      });
      appointmentListPatient.belongsTo(models.patients, {
        foreignKey: "patientId",
      });
    }
  }
  appointmentListPatient.init(
    {
      appointmentListId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "appointmentListPatient",
    }
  );
  return appointmentListPatient;
};
