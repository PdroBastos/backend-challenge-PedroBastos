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
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
    
  
);
return Posts;
};