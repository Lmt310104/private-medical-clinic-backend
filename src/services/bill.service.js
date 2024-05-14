"use strict";
const model = require("../model");

class billService {
  static async deleteAllBillsByPatientId({ patientId }) {
    const allBills = model.bills.findAll({
      where: { patientId: patientId },
    });
  }
}
module.exports = billService;
