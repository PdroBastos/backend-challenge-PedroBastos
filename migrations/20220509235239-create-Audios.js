'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Audios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      URL: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        // URL:
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // User hasMany Posts n:n
          model: 'Users',
          key: 'id'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Posts hasMany Users n:n
          model: 'Posts',
          key: 'id'
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
