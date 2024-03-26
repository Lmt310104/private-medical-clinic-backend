"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unit.hasMany(models.drugs, { foreignKey: "unitId" });
    }
  }
  unit.init(
    {
      unitName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "unit",
    }
  );
  return unit;
};
