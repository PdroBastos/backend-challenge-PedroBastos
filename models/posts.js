'use strict';

const { 
  Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {

    static associate(models) {
     
      // Posts.belongsTo(models.Users);
    };
  };
  Posts.init(
    {
      id:{
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
    
  
);
return Posts;
};