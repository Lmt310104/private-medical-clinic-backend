"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "userGroups",
      [
        {
          groupName: "Quản trị viên",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          groupName: "Bác sĩ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          groupName: "Tiếp tân",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          groupName: "Kế toán",
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
