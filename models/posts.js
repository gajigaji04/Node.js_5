// models/posts.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      Posts.hasMany(models.Likes, { foreignKey: "postId" });
    }
  }

  Posts.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likedPostsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );

  return Posts;
};
