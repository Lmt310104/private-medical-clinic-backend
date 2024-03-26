"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usage.belongsToMany(models.appointmentRecords, {
        through: models.appointmentRecordDetails,
        foreignKey: "usageId",
      });
      usage.belongsToMany(models.drugs, {
        through: models.appointmentRecordDetails,
        foreignKey: "usageId",
      });
    }
  }
  usage.init(
    {
      usageDes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "usage",
    }
  );
  return usage;
};
