"use strict";

/** @type {import('sequelize-cli').Migration} */
const featNames = [
  "Xem lịch khám",
  "Tạo lịch khám",
  "Cập nhật lịch khám",
  "Xóa lịch khám",
  "Tiếp nhận ca khám",
  "Thanh toán",
  "Xem bệnh nhân",
  "Tạo bệnh nhân",
  "Cập nhật thông tin bệnh nhân",
  "Xem phiếu khám bệnh",
  "Xem quy định",
  "Cập nhật quy định",
  "Xem hóa đơn",
  "Xem chức vụ",
  "Tạo chức vụ",
  "Cập nhật trạng thái chức vụ",
  "Cập nhật thông tin chức vụ",
  "Xem nhân viên",
  "Tạo nhân viên",
  "Cập nhật thông tin nhân viên",
  "Cập nhật trạng thái làm việc",
  "Xem thuốc",
  "Tạo thuốc",
  "Cập nhật thông tin thuốc",
  "Cập nhật trạng thái lưu hành",
  "Xem phân quyền chi tiết",
  "Cập nhật phân quyền chi tiết",
  "Xem báo cáo",
];
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
    let mapFeature = [];
    for (let i = 0; i < featNames.length; i++) {
      mapFeature.push({
        featName: featNames[i],
        loadedElement: loadedElements[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("feats", mapFeature, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("feats", null, {});
  },
};
