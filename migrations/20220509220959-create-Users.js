'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: console.log(uuid())
      },
      name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      psw: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: false,
      },
      isadmin: {
        type: Sequelize.DataTypes.BOOLEAN(),
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
