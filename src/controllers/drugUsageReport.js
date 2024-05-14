const asyncHandler = require("express-async-handler");
const getDrugUsageReportService = require("../services/drugUsageReportService");

const getAllDrugUsageReport = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    const { page = 1, pageSize = 10, ...filters } = req.query;
    try {
      const data = await getDrugUsageReportService.getDrugUsageReports(
        page,
        pageSize,
        filters
      );
      return res.status(200).json({
        status: res.statusCode,
        message: "Success",
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  } else {
    return res.status(500).json({
      status: statusCode,
      message: "Unauthorized",
      data: "",
    });
  }
});

module.exports = { getAllDrugUsageReport };
