"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointmentRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      appointmentRecords.belongsTo(models.patients, {
        foreignKey: "patientId",
      });
      appointmentRecords.belongsTo(models.appointmentList, {
        foreignKey: "appointmentListId",
      });
      appointmentRecords.belongsTo(models.diseases, {
        foreignKey: "diseaseId",
      });
      appointmentRecords.belongsToMany(models.drugUsage, {
        through: models.drugUsageAppointmentRecords,
        foreignKey: "appointmentRecordId",
        otherKey: "drugUsageId",
      });
      appointmentRecords.belongsToMany(models.drugs, {
        through: models.appointmentRecordDetails,
        foreignKey: "appointmentRecordId",
        otherKey: "drugId",
      });
    }
  }
  appointmentRecords.init(
    {
      patientId: DataTypes.INTEGER,
      symptoms: DataTypes.STRING,
      diseaseId: DataTypes.INTEGER,
      appointmentListId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "appointmentRecords",
    }
  );
  return appointmentRecords;
};
