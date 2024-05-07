"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "feats",
      [
        {
          featName: "getAppointmentList",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addAppointmentList",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getAppointmentListPatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addAppointmentListPatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateAppointmentListPatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteAppointmentListPatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getAppointmentListRecord",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addAppointmentListRecord",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteAppointmentListRecord",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateAppointmentListRecord",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getAppointmentRecordDetail",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addAppointmentRecordDetail",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteAppointmentRecordDetail",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateAppointmentRecordDetail",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getArgument",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateArgument",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getBill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addBill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteBill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateBill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getDisease",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addDisease",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteDisease",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateDisease",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getUserGroup",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getPatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addPatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deletePatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updatePatient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getUnit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addUnit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteUnit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateUnit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getUsage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addUsage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteUsage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateUsage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getUser",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addUser",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteUser",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateUser",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getDrug",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "addDrug",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "deleteDrug",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateDrug",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "getAuthorization",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          featName: "updateAuthorization",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("feats", null, {});
  },
};
