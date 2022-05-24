'use strict';
const {v4 : uuidv4} = require('uuid');
const { user } = require('pg/lib/defaults');
const { 
Model, UUIDV1, UUIDV4 
} = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      
      // Users.hasMany(models.Posts);
    };
  };

  Users.init(
    {
      id:{
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