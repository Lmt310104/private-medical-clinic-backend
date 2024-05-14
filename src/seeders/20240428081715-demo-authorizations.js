'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "authorizations",
      [
        {
          userGroupId: 1,
          featId: 1,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 2,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 3,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 4,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 5,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 6,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 7,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 8,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 9,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 10,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 11,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 12,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 13,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 14,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 15,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 16,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 17,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 18,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 19,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 20,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 21,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 22,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 23,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 24,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 25,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 26,
          isAccess: true,
        },
        {
          userGroupId: 1,
          featId: 27,
          isAccess: true,
        },
        {
          userGroupId: 2,
          featId: 1,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 2,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 3,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 4,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 5,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 6,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 7,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 8,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 9,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 10,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 11,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 12,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 13,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 14,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 15,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 16,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 17,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 18,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 19,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 20,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 21,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 22,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 23,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 24,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 25,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 26,
          isAccess: false,
        },
        {
          userGroupId: 2,
          featId: 27,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 1,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 2,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 3,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 4,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 5,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 6,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 7,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 8,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 9,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 10,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 11,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 12,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 13,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 14,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 15,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 16,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 17,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 18,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 19,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 20,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 21,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 22,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 23,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 24,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 25,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 26,
          isAccess: false,
        },
        {
          userGroupId: 3,
          featId: 27,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 1,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 2,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 3,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 4,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 5,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 6,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 7,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 8,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 9,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 10,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 11,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 12,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 13,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 14,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 15,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 16,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 17,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 18,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 19,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 20,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 21,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 22,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 23,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 24,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 25,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 26,
          isAccess: false,
        },
        {
          userGroupId: 4,
          featId: 27,
          isAccess: false,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("authorizations", null, {});
  }
};
