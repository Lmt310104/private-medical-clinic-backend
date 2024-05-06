"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "userGroups",
      [
        {
          groupName: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          groupName: "Doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          groupName: "Reception",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          groupName: "Accountant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("userGroups", null, {});
  },
};
