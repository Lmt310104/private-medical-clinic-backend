"use strict";
const model = require("../models");
class appointmentRecordDetailService {
  static async findById({ id }) {
    return await model.appointmentRecordDetails.findOne({
      where: { id: id },
    });
  }
}
module.exports = appointmentRecordDetailService;
