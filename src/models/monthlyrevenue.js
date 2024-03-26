"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class monthlyRevenue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      monthlyRevenue.belongsToMany(models.bills, {
        through: models.monthlyRevenueBill,
        foreignKey: "monthlyRevenueId",
      });
    }
  }
  monthlyRevenue.init(
    {
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "monthlyRevenue",
    }
  );
  return monthlyRevenue;
};
