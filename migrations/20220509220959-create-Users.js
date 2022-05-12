'use strict';
const { DataTypes } = require("sequelize/types");


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Users", {
      id: {
        type: Sequelize.DataTypes.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      psw: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [7, 42]
        }
      },
      isadmin: {
        type: Sequelize.DataTypes.BOOLEAN(),
      },
      postId:{
        type: Sequelize.INTENGER
      },

      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
