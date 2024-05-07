"use strict";
const model = require("../models");
class appointmentListRecordService {
  static async findRecordById({ id }) {
    return await model.appointmentRecords.findOne({
      where: { id: id },
    });
  }
  static async deleteAllAppointmentListRecordByPatientId({ patientId }) {
    const allAppointmentListRecord = await model.appointmentListRecords.findAll(
      {
        where: {
          patientId: patientId,
        },
      }
    );
  }
}

module.exports = appointmentListRecordService;
