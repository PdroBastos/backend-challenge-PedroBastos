"use strict";

const { Model } = require("sequelize");
const users = require("./users");
const posts = require("./posts");

module.exports = (sequelize, DataTypes) => {
  class Audios extends Model {
    static associate(models) {
      // Users.belongsToMany(models.Posts, { through: Audios });
    }
  }
  Audios.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nameFile: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID
      },
      postId: {
        type: DataTypes.UUID
      },
    },
    {
      sequelize,
      modelName: "Audios",
    }
  );
  return Audios;
};
