'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      psw: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isadmin: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
