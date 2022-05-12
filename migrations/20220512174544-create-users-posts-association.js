'use strict';

const { FOREIGNKEYS } = require("sequelize/types/query-types");

module.exports = {
  async up(queryInterface, Sequelize) {
   queryInterface.addConstraint('Users',{
     fields: ['postId'],
     type: 'foreing key',
     name: 'users_posts_association',
     references: {
       tabe: 'Posts',
       field: 'id'
     }
   });
  },
  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('Users',{
      fields: ['postId'],
      type: 'foreing key',
      name: 'users_posts_association',
      references: {
        tabe: 'Posts',
        field: 'id'
      }
    });
  }
};