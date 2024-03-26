"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class drugUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      drugUsage.belongsToMany(models.appointmentRecords, {
        through: models.drugUsageAppointmentRecords,
        foreignKey: "usageId",
      });
    }
  }
  drugUsage.init(
    {
      month: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "drugUsage",
    }
  );
  return drugUsage;
};
