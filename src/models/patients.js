"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patients.hasMany(models.appointmentRecords, { foreignKey: "patientId" });
      patients.hasMany(models.appointmentListPatient, {
        foreignKey: "patientId",
      });
      patients.belongsToMany(models.appointmentList, {
        through: models.bills,
        foreignKey: "patientId",
      });
    }
  }
  patients.init(
    {
      fullName: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthYear: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "patients",
    }
  );
  return patients;
};
