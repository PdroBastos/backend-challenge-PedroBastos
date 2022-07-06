"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }

  Users.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      psw: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 47],
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  Users.addHook("beforeSave", async (crypt) => {
    return bcrypt
      .hash(crypt.psw, 8)
      .then((hash) => {
        crypt.psw = hash;
      })
      .catch((err) => {
        throw new Error();
      });
  });
  return Users;
};
