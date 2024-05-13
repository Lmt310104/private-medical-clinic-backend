"use strict";

/** @type {import('sequelize-cli').Migration} */
const loadedElements = [
  "RAppointment",
  "CAppointment",
  "UAppointment",
  "DAppointment",
  "CRecord",
  "CInvoice",
  "RPatient",
  "CPatient",
  "UPatient",
  "RRecord",
  "RArgument",
  "UArgument",
  "RInvoice",
  "RUserGroup",
  "CUserGroup",
  "DUserGroup",
  "UUserGroup",
  "RUser",
  "CUser",
  "UUser",
  "DUser",
  "RDrug",
  "CDrug",
  "UDrug",
  "DDrug",
  "RAuthorization",
  "UAuthorization",
  "RReport",
];

module.exports = {
  async up(queryInterface, Sequelize) {
    let mapAuthorization = [];
    for (let i = 1; i <= 4; i++) {
      for (let z = 1; z <= loadedElements.length; z++) {
        mapAuthorization.push({
          userGroupId: i,
          featId: z,
          isAccess: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("authorizations", mapAuthorization, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("authorizations", null, {});
  },
};
