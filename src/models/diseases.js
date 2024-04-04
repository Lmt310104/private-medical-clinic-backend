"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diseases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      diseases.hasMany(models.appointmentRecords, { foreignKey: "diseaseId" });
    }
  }
  diseases.init(
    {
      diseaseName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "diseases",
    }
  );
  return diseases;
};
