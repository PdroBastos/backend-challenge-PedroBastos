"use strict";

const { Model } = require("sequelize");
const users = require("./users");
const posts = require("./posts");

module.exports = (sequelize, DataTypes) => {
  class Audios extends Model {
    static associate(models) {}
  }
  Audios.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
      },
      postId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Audios",
    }
  );
  return Audios;
};
