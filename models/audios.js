'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Audios.init(
    {
      URL: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      // postid: {

      // },
      // userid: {

      // },
    
    },
    {
      sequelize,
      modelName: "Audios",
    }
  );
  return Audios;
};