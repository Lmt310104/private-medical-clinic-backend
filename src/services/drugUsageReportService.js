const db = require("../models");

const getDrugUsageReports = async (page, pageSize, filters) => {
  const whereClause = {};

  // Add filters to whereClause
  for (const key in filters) {
    if (filters[key]) {
      whereClause[key] = filters[key];
    }
  }

  const { count, rows: drugUsageReports } =
    await db.drugUsageReport.findAndCountAll({
      where: whereClause,
      offset: (page - 1) * pageSize,
      limit: parseInt(pageSize),
    });

  return {
    total: count,
    drugUsageReports,
    currentPage: page,
    totalPages: Math.ceil(count / pageSize),
  };
};

module.exports = {
  getDrugUsageReports,
};
