"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      // define association here
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
      likedPostsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
