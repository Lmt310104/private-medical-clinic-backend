'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('users', [{
      userName: "Admin",
      fullName: "AdminFullName",
      email: "2252xxxx@gm.uit.edu.vn",
      password: "123456",
      userGroupId: 1,
      refreshToken: "",
      }], {});
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('users', null, {});

  }
};
