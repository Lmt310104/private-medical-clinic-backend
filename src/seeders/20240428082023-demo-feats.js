'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "feats",
      [
        {
          featName: "getAppointmentList",
        },
        {
          featName: "addAppointmentList",
        },
        {
          featName: "getAppointmentListPatient",
        },
        {
          featName: "addAppointmentListPatient",
        },
        {
          featName: "updateAppointmentListPatient",
        },
        {
          featName: "deleteAppointmentListPatient",
        },
        {
          featName: "getAppointmentListRecord",
        },
        {
          featName: "addAppointmentListRecord",
        },
        {
          featName: "deleteAppointmentListRecord",
        },
        {
          featName: "updateAppointmentListRecord",
        },
        {
          featName: "getAppointmentRecordDetail",
        },
        {
          featName: "addAppointmentRecordDetail",
        },
        {
          featName: "deleteAppointmentRecordDetail",
        },
        {
          featName: "updateAppointmentRecordDetail",
        },
        {
          featName: "getArgument",
        },
        {
          featName: "updateArgument",
        },
        {
          featName: "getBill",
        },
        {
          featName: "addBill",
        },
        {
          featName: "deleteBill",
        },
        {
          featName: "updateBill",
        },
        {
          featName: "getDisease",
        },
        {
          featName: "addDisease",
        },
        {
          featName: "deleteDisease",
        },
        {
          featName: "updateDisease",
        },
        {
          featName: "getUserGroup",
        },
        {
          featName: "getPatient",
        },
        {
          featName: "addPatient",
        },
        {
          featName: "deletePatient",
        },
        {
          featName: "updatePatient",
        },
        {
          featName: "getUnit",
        },
        {
          featName: "addUnit",
        },
        {
          featName: "deleteUnit",
        },
        {
          featName: "updateUnit",
        },
        {
          featName: "getUsage",
        },
        {
          featName: "addUsage",
        },
        {
          featName: "deleteUsage",
        },
        {
          featName: "updateUsage",
        },
        {
          featName: "getUser",
        },
        {
          featName: "addUser",
        },
        {
          featName: "deleteUser",
        },
        {
          featName: "updateUser",
        },
        {
          featName: "getDrug",
        },
        {
          featName: "addDrug",
        },
        {
          featName: "deleteDrug",
        },
        {
          featName: "updateDrug",
        },
        {
          featName: "getAuthorization",
        },
        {
          featName: "updateAuthorization",
        },
        {
          featName: "addUserGroup",
        },
        {
          featName: "deleteUserGroup",
        },
        {
          featName: "updateUserGroup",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("feats", null, {});
  }
};
