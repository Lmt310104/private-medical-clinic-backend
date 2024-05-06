"use strict";
const model = require("../models/index");

class drugService {
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
}
module.exports = drugService;
