'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Audios", {
      id: {
        type: Sequelize.DataTypes.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      URL: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        // URL:
      },
      postId: {
        type: Sequelize.DataTypes.INTEGER(),
        allowNull: false,
        references: {
          model: {
            tableName: "Posts",
          },
          key: "id",
        }
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER(),
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        }
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Audios');
  }
};
