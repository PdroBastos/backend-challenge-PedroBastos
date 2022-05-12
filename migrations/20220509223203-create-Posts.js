'use strict';

module.exports = {
  async up (queryInterface, Sequelize) { 
    return queryInterface.createTable("Posts", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
      
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
  
  };
