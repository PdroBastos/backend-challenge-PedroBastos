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

    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
    
  
);
return Posts;
};