"use strict";
const { where } = require("sequelize");
const model = require("../models");

class patientService {
  static async findPatientById({ id }) {
    return model.patients.findOne({
      where: { id: id },
    });
  }
  static async validPhoneNumber({ phoneNumber }) {
    return model.patients.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
      attributes: { exclude: ["code"] },
    });
  }
  static async updateCode({ code, phoneNumber }) {
    return model.patients.update(
      {
        code: code,
      },
      {
        where: { phoneNumber: phoneNumber },
      }
    );
  }
  static async checkCode({ phoneNumber, code }) {
    return model.patients.findOne({
      where: {
        phoneNumber: phoneNumber,
        code: code,
      },
    });
  }
}
module.exports = patientService;
