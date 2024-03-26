"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class drugs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      drugs.belongsTo(models.unit, { foreignKey: "unitId" });
      drugs.belongsToMany(models.appointmentRecords, {
        through: models.appointmentRecordDetails,
        foreignKey: "drugId",
      });
      drugs.belongsToMany(models.usage, {
        through: models.appointmentRecordDetails,
        foreignKey: "drugId",
      });
    }
  }
  drugs.init(
    {
      drugName: DataTypes.STRING,
      price: DataTypes.BIGINT,
      count: DataTypes.INTEGER,
      unitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "drugs",
    }
  );
  return drugs;
};
