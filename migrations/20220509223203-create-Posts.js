'use strict';

module.exports = {
  async up (queryInterface, Sequelize) { 
    return queryInterface.createTable("Posts", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {         
          model: 'Users',
          key: 'id'
        }
      },
      
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
  
  };
