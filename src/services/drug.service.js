"use strict";
const model = require("../models/index");

class drugService {
  static async getAllDrug() {
    const allDrug = await model.drugs.findAll();
    return allDrug;
  }
  static async reduceDrug({ drugId, count }) {
    const drug = await model.drugs.findOne({ where: { id: drugId } });
    if (!drug) {
      return null;
    }
    const newCount = drug.count - count;
    if (newCount < 0) {
      return null;
    }
    return await model.drugs.update(
      { count: newCount },
      { where: { id: drugId } }
    );
  }
  static async findDrugById({ id }) {
    return await model.drugs.findOne({ where: { id } });
  }
  static async updateStatusById({ id, status }) {
    return await model.drugs.update(
      { status: !status },
      {
        where: {
          id: id,
        },
      }
    );
  }
}
module.exports = drugService;
