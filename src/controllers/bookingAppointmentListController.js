import db from "../models/index";
import asyncHandler from "express-async-handler";
const { google } = require("googleapis");
const { Op } = require("sequelize");
import Sequelize from "sequelize";
const moment = require("moment");

const fetchDataFromGoogleSheets = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
      const client = await auth.getClient();
      const googleSheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1RizNQatygXejzxg3vrgZ-hh0w2y_fJg4EESPTn03gEg";
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
      });
      const data = getRows.data.values;
      for (let i = 1; i < data.length; i++) {
        const existingBookingAppointment =
          await db.bookingAppointmentList.findOne({
            where: {
              phone: data[i][3],
            },
          });
        if (!existingBookingAppointment) {
          const bookingAppointmentList = await db.bookingAppointmentList.create(
            {
              bookingDate: data[i][0],
              fullName: data[i][2],
              phone: data[i][3],
              gender: data[i][4],
              address: data[i][5],
              bookingAppointment: data[i][6],
            }
          );
        }
      }
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});
const getAllBookingAppointmentList = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const bookingAppointmentList = await db.bookingAppointmentList.findAll();
      if (!bookingAppointmentList) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ bookingAppointmentList: bookingAppointmentList });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getBookingAppointmentListByDate = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const bookingDate = moment(req.body.bookingDate).format("YYYY-MM-DD");
      const bookingAppointmentList = await db.bookingAppointmentList.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("bookingDate")),
              moment(bookingDate).year()
            ),
            Sequelize.where(
              Sequelize.fn("MONTH", Sequelize.col("bookingDate")),
              moment(bookingDate).month() + 1
            ),
            Sequelize.where(
              Sequelize.fn("DAY", Sequelize.col("bookingDate")),
              moment(bookingDate).date()
            ),
          ],
        },
      });
      if (!bookingAppointmentList) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ bookingAppointmentList: bookingAppointmentList });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

const createBookingAppointment = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const existingBookingAppointment =
        await db.bookingAppointmentList.findOne({
          where: {
            phone: req.body.phone,
          },
        });
      if (!existingBookingAppointment) {
        const bookingAppointment = await db.bookingAppointmentList.create({
          bookingDate: req.body.bookingDate,
          fullName: req.body.fullName,
          phone: req.body.phone,
          gender: req.body.gender,
          address: req.body.address,
          bookingAppointment: req.body.bookingAppointment,
        });
        return res.status(200).json({ bookingAppointment: bookingAppointment });
      } else {
        return res
         .status(400)
         .json({ message: "Phone number already exists" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

const updateBookingAppointmentById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const existingBookingAppointment =
        await db.bookingAppointmentList.findOne({
          where: {
            id: req.params.id,
          },
        });
      if (!existingBookingAppointment) {
        return res.status(404).json({ message: "Not found" });
      }
      const bookingAppointment = await db.bookingAppointmentList.update(
        {
          bookingDate: req.body.bookingDate,
          fullName: req.body.fullName,
          phone: req.body.phone,
          gender: req.body.gender,
          address: req.body.address,
          bookingAppointment: req.body.bookingAppointment,
          status: req.body.status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

const deleteBookingAppointmentById = asyncHandler(async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const existingBookingAppointment =
        await db.bookingAppointmentList.findOne({
          where: {
            id: req.params.id,
          },
        });
      if (!existingBookingAppointment) {
        return res.status(404).json({ message: "Not found" });
      }
      const bookingAppointment = await db.bookingAppointmentList.update(
        {
          status: "Cancelled",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default {
  fetchDataFromGoogleSheets,
  getAllBookingAppointmentList,
  getBookingAppointmentListByDate,
  createBookingAppointment,
  updateBookingAppointmentById,
  deleteBookingAppointmentById,
};
