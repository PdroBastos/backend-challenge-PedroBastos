'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Audios", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true
      },
      nameFile: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {         
          model: 'Users',
          key: 'id'
        }
      },
      postId: {
        type: Sequelize.UUID,
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
