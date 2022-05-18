'use strict';

const { 
Model 
} = require('sequelize');

// const Posts = require('./posts');


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {


    static associate(models) {
      // Users.belongsTo(Posts, {
      //   constraint: true,
      //   foreignKey: 'userId'
      // });
    }


  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        validate: {
        notEmpty: true
        }
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
            len: [3, 47]
          }
      },
      isadmin: {
        type: DataTypes.BOOLEAN,
      },
    
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};