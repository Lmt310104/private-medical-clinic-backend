const db = require("../models/index");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const getAllDrugs = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.isAuthenticated()) {
        try {
          // const userGroup = await db.userGroup.findOne({
          //   where: { groupName: req.user.user.role },
          // });
          // const authorization = await db.authorizations.findOne({
          //   where: { userGroupId: userGroup.id, featId: 42 },
          // });
          // if (!authorization.isAccess) {
          //   return res.status(401).json({
          //     status: res.statusCode,
          //     message: "Unauthorized",
          //   });
          // }
          const drugs = await db.drugs.findAll();
          res.status(200).json({ drugs: drugs });
        } catch (err) {
          res.status(500).json({ message: err });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error2" });
  }
});

const addDrug = asyncHandler(async (req, res) => {
  const drug = req.body;
  try {
    if (req.isAuthenticated()) {
      try {
        // const userGroup = await db.userGroup.findOne({
        //   where: { groupName: req.user.user.role },
        // });
        // const authorization = await db.authorizations.findOne({
        //   where: { userGroupId: userGroup.id, featId: 43 },
        // });
        // if (!authorization.isAccess) {
        //   return res.status(401).json({
        //     status: res.statusCode,
        //     message: "Unauthorized",
        //   });
        // }
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
          res.status(200).json({ message: "Drug added successfully" });
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

const searchDrugs = asyncHandler(async (req, res) => {});

const getDrug = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      try {
        // const userGroup = await db.userGroup.findOne({
        //   where: { groupName: req.user.user.role },
        // });
        // const authorization = await db.authorizations.findOne({
        //   where: { userGroupId: userGroup.id, featId: 42 },
        // });
        // if (!authorization.isAccess) {
        //   return res.status(401).json({
        //     status: res.statusCode,
        //     message: "Unauthorized",
        //   });
        // }
        const id = req.params.id;
        const drug = await db.drugs.findOne({ where: { id: id } });
        if (!drug) {
          return res.status(404).json({ message: "Drug not found" });
        }
        res.status(200).json({ drug: drug });
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

const updateDrug = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      try {
        // const userGroup = await db.userGroup.findOne({
        //   where: { groupName: req.user.user.role },
        // });
        // const authorization = await db.authorizations.findOne({
        //   where: { userGroupId: userGroup.id, featId: 45 },
        // });
        // if (!authorization.isAccess) {
        //   return res.status(401).json({
        //     status: res.statusCode,
        //     message: "Unauthorized",
        //   });
        // }
        const id = req.params.id;
        const drug = req.body;
        const existingDrug = await db.drugs.findOne({ where: { id: id } });
        if (!existingDrug) {
          return res.status(404).json({ message: "Drug not found" });
        }
        await db.drugs.update(
          {
            drugName: drug.drugName,
            price: drug.price,
            count: drug.count,
            unitId: drug.unitId,
          },
          { where: { id: id } }
        );
        res
          .status(200)
          .json({ message: "Drug updated successfully", durg: drug });
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

const deleteDrug = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      try {
        // const userGroup = await db.userGroup.findOne({
        //   where: { groupName: req.user.user.role },
        // });
        // const authorization = await db.authorizations.findOne({
        //   where: { userGroupId: userGroup.id, featId: 44 },
        // });
        // if (!authorization.isAccess) {
        //   return res.status(401).json({
        //     status: res.statusCode,
        //     message: "Unauthorized",
        //   });
        // }
        const id = req.params.id;
        const drug = await db.drugs.findOne({ where: { id: id } });
        if (!drug) {
          return res.status(404).json({ message: "Drug not found" });
        }
        await db.drugs.destroy({ where: { id: id } });
        res.status(200).json({ message: "Drug deleted successfully" });
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

export default { getAllDrugs, addDrug, getDrug, updateDrug, deleteDrug };
