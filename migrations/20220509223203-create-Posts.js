"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
        type: Sequelize.DataTypes.TEXT(),
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },

      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
