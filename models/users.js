'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Posts);
      models.Posts.hasMany(Users);
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
            len: [3, 42]
        }
      },
      isadmin: {
        type: DataTypes.BOOLEAN(),
        
      },
    
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};