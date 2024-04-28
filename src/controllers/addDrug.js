const db = require("../models/index");
const asyncHandler = require("express-async-handler");

const addDrug = asyncHandler(async (req, res) => {
  const drug = req.body;
  try {
    if (req.isAuthenticated()) {
      try {
        const existingDrug = await db.drugs.findOne({
          where: { drugName: drug.drugName },
        });
        if (existingDrug) {
          return res.status(400).json({ message: "Drug already exists" });
        } else {
          const newDrug = await db.drugs.create({
            drugName: drug.drugName,
            price: drug.price,
            count: drug.count,
            unitId: drug.unitId,
          });
          if (existingDrug) {
            return res.status(400).json({ message: "Drug already exists" });
          } else {
            const newDrug = await db.drugs.create({
              drugName: drug.drugName,
              price: drug.price,
              count: drug.count,
              unitId: drug.unitId,
              note: drug.note || "",
            });
            res.status(200).json({ message: "Drug added successfully" });
          }
        }
      } catch (err) {
        res.status(500).json({ message: "server error" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});
