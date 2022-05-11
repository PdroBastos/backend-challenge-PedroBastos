'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    
      text: {
        type: DataTypes.TEXT(255),
        allowNull: false
      },
      userid: {
          
      },
    
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};