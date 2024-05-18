"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointmentRecordDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      appointmentRecordDetails.belongsTo(models.appointmentRecords, {
        foreignKey: "appointmentRecordId",
        as: "appointmentRecord",
      });
      appointmentRecordDetails.belongsTo(models.drugs, {
        foreignKey: "drugId",
        as: "drug",
      });
      appointmentRecordDetails.belongsTo(models.usage, {
        foreignKey: "usageId",
        as: "usage",
      });
    }
  }
  appointmentRecordDetails.init(
    {
      appointmentRecordId: DataTypes.INTEGER,
      drugId: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
      drugPrice: DataTypes.BIGINT,
      usageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "appointmentRecordDetails",
    }
  );
  return appointmentRecordDetails;
};
