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
      UserId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
