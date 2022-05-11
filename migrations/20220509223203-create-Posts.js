'use strict';

module.exports = {
  async up (queryInterface, Sequelize) { 
      return queryInterface.createTable("Posts", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: console.log(uuid())
        },
        title: {
          type: Sequelize.DataTypes.STRING(30),
          allowNull: false,
        },
        subtitle: {
          type: Sequelize.DataTypes.STRING(30),
          allowNull: false,
        },
        text: {
          type: Sequelize.DataTypes.TEXT(255),
          allowNull: false,
        },
        userid: {

        },
        updatedAt: Sequelize.DataTypes.DATE,
        createdAt: Sequelize.DataTypes.DATE,
      });  
  },

  async down (queryInterface, Sequelize) {
   
  }
  
  };
