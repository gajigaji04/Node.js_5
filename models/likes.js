"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      Likes.belongsTo(models.Users, { foreignKey: "UserId" });
      Likes.belongsTo(models.Posts, { foreignKey: "PostId" });
    }
  }
  Likes.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
