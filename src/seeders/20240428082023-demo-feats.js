'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "feats",
      [
        {
          featName: "RAppointment",
          loadedElement: "Examination"
        },
        {
          featName: "CAppointment",
          loadedElement: "Examination"
        },
        {
          featName: "UAppointment",
          loadedElement: "Examination"
        },
        {
          featName: "DAppointment",
          loadedElement: "Examination"
        },
        {
          featName: "CRecord",
          loadedElement: "Examination"
        },
        {
          featName: "CBill",
          loadedElement: "Examination"
        },
        {
          featName: "RPatient",
          loadedElement: "Patient"
        },
        {
          featName: "CPatient",
          loadedElement: "Patient"
        },
        {
          featName: "DPatient",
          loadedElement: "Patient"
        },
        {
          featName: "UPatient",
          loadedElement: "Patient"
        },
        {
          featName: "RRecord",
          loadedElement: "Patient"
        },
        {
          featName: "DRecord",
          loadedElement: "Patient"
        },
        {
          featName: "RBill",
          loadedElement: "Bill"
        },
        {
          featName: "DBill",
          loadedElement: "Bill"
        },
        {
          featName: "RReport",
          loadedElement: "Report"
        },
        {
          featName: "RUser",
          loadedElement: "User"
        },
        {
          featName: "CUser",
          loadedElement: "User"
        },
        {
          featName: "UUser",
          loadedElement: "User"
        },
        {
          featName: "DUser",
          loadedElement: "User"
        },
        {
          featName: "UUserGroup",
          loadedElement: "User"
        },
        {
          featName: "RUserGroup",
          loadedElement: "User"
        },
        {
          featName: "RDrug",
          loadedElement: "Medicine"
        },
        {
          featName: "CDrug",
          loadedElement: "Medicine"
        },
        {
          featName: "DDrug",
          loadedElement: "Medicine"
        },
        {
          featName: "UDrug",
          loadedElement: "Medicine"
        },
        {
          featName: "RArgument",
          loadedElement: "Principle"
        },
        {
          featName: "UArgument",
          loadedElement: "Principle"
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("feats", null, {});
  }
};
