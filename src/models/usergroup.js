"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userGroup.hasMany(models.users, { foreignKey: "userGroupId" });
    }
  }
  userGroup.init(
    {
      groupName: DataTypes.STRING,
      note: DataTypes.STRING,
      isActive: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userGroup",
    }
  );
  return userGroup;
};
