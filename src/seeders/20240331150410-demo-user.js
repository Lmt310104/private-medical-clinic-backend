"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          userName: "Admin",
          fullName: "Lê Minh Toàn",
          email: "lmtoan311@gm.uit.edu.vn",
          password: await bcrypt.hashSync("123456", 10),
          userGroupId: 1,
          refreshToken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
