'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Audios", {
      id: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      URL: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        // URL:
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {         // User hasMany Posts n:n
          model: 'Users',
          key: 'id'
        }
      },
      postId: {
        type: Sequelize.UUID,
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
