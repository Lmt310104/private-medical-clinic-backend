"use strict";
const model = require("../models");
class appointmentListPatientService {
  static async deleteAllAppointmentListPatientByPatientId({ patientId }) {
    const allAppointmentListPatient =
      await model.appointmentListPatients.findAll({
        where: {
          patientId: patientId,
        },
      });
  }
}
module.exports = appointmentListPatientService;
