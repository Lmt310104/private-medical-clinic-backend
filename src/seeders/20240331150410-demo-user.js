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
        {
          userName: "Doctor",
          fullName: "Nguyen Van A",
          email: "doctor@gm.uit.edu.vn",
          password: await bcrypt.hashSync("123456", 10),
          userGroupId: 2,
          refreshToken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Reception",
          fullName: "Nguyen Van B",
          email: "reception@gm.uit.edu.vn",
          password: await bcrypt.hashSync("123456", 10),
          userGroupId: 3,
          refreshToken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Accountant",
          fullName: "Nguyen Van C",
          email: "reception@gm.uit.edu.vn",
          password: await bcrypt.hashSync("123456", 10),
          userGroupId: 4,
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
