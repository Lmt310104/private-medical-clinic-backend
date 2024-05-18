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
          fullName: "Trần Văn A",
          email: "thongduy2811@gmail.com",
          password: await bcrypt.hashSync("123456", 10),
          userGroupId: 1,
          refreshToken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Doctor",
          fullName: "Trần Văn B",
          email: "doctor@gm.uit.edu.vn",
          password: await bcrypt.hashSync("123456", 10),
          userGroupId: 2,
          refreshToken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Reception",
          fullName: "Trần Văn C",
          email: "reception@gm.uit.edu.vn",
          password: await bcrypt.hashSync("123456", 10),
          userGroupId: 3,
          refreshToken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Accountant",
          fullName: "Trần Văn D",
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
