const cron = require("cron");
const db = require("../models");
const drugService = require("../services/drug.service");

function isLastDayOfMonth() {
  const date = new Date();
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getDate() === 1;
}

async function saveData() {
  if (!isLastDayOfMonth()) {
    return;
  }
  // Fetch all drugs
  const allDrugs = await drugService.getAllDrug();

  // Map through all drugs and create DrugUsageReport records
  const drugUsageReports = allDrugs.map((drug) => ({
    drugId: drug.id,
    count: drug.count,
    month: new Date().getMonth() + 1, // JavaScript months are 0-indexed
    year: new Date().getFullYear(),
  }));

  // Save all DrugUsageReport records to the database
  await db.drugUsageReport.bulkCreate(drugUsageReports);
}

const job = new cron.CronJob("59 23 * * *", saveData); // Run at 11:59 PM on the last day of each month

module.exports = job;
