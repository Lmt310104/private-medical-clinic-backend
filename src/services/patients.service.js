"use strict";
const { where } = require("sequelize");
const model = require("../models");

class patientService {
  static async findPatientById({ id }) {
    return model.patients.findOne({
      where: { id: id },
    });
  }
}
module.exports = patientService;
