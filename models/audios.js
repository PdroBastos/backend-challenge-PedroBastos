'use strict';

const {
  Model
} = require('sequelize');

const users = require('./users');
const posts = require('./posts')

module.exports = (sequelize, DataTypes) => {
  class Audios extends Model {
   
    static associate(models) {
      // Users.belongsToMany(models.Posts, { through: Audios });
    }
  }
  Audios.init(
    {
      URL: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Audios",
    }
  );
  return Audios;
};