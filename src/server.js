import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./config/connectDB";
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const file = fs.readFileSync("./src/docs/swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
// const cron = require("node-cron");
// const moment = require("moment");
// const fs = require("fs");
// const spawn = require("child_process").spawn;

//Thay 0 0 * * * thành */1 * * * * để test nó sẽ cập nhật trong một phút
// cron.schedule("0 0 * * *", () => {
//   const fileName = `${process.env.DB_NAME}_${moment().format(
//     "YYYY_MM_DD"
//   )}.sql`;
//   const wstream = fs.createWriteStream(`${fileName}`);
//   console.log("---------------------");
//   console.log("Running Database Backup Cron Job");
//   var mysqldump = spawn("C:/xampp/mysql/bin/mysqldump", [
//     `-u${process.env.DB_USERNAME}`,
//     `-p${process.env.DB_PASSWORD}`,
//     process.env.DB_NAME,
//   ]);

//   mysqldump.stdout
//     .pipe(wstream)
//     .on("finish", () => {
//       console.log("DB Backup Completed!");
//     })
//     .on("error", (err) => {
//       console.log(err);
//     });
// });
const app = express();
const auth = require("./middleware/passport");
const PORT = process.env.PORT || 8888;
const session = require("express-session");
const secretSessionKey = process.env.SECRET_SESSION_KEY;
const job = require("../src/utils/saveData");

//connect to database
connection();

//cors
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

//session
app.use(
  session({
    secret: secretSessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
  })
);
app.use(cookieParser());
app.use(auth.initialize());
app.use(auth.session());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true"); // Thiết lập Access-Control-Allow-Credentials thành true
  next();
});

app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", require("./routes/authRouter"));
app.use("/api/v1/authorizations", require("./routes/authorizationRouter"));
app.use("/api/v1/usergroups", require("./routes/groupUserRouter"));
app.use("/api/v1/drugs", require("./routes/drugRouter"));
app.use("/api/v1/arguments", require("./routes/argumentRouter"));
app.use("/api/v1/units", require("./routes/unitRouter"));
app.use("/api/v1/diseases", require("./routes/diseaseRouter"));
app.use("/api/v1/usage", require("./routes/usageRouter"));
app.use("/api/v1/users", require("./routes/userRouter"));
app.use(
  "/api/v1/bookingappointmentlist",
  require("./routes/bookingAppointmentListRouter")
);
app.use("/api/v1/patients", require("./routes/patientRouter"));
app.use(
  "/api/v1/appointmentrecords",
  require("./routes/appointmentRecordRouter")
);
app.use("/api/v1/appointmentlists", require("./routes/appointmentListRouter"));
app.use(
  "/api/v1/appointmentlistpatients",
  require("./routes/appointmentListPatientRouter")
);
app.use(
  "/api/v1/appointmentrecorddetails",
  require("./routes/appointmentRecordDetailRouter")
);
app.use("/api/v1/bills", require("./routes/billRouter"));
app.use("/api/v1/dialogflow", require("./routes/dialogflowRouter"));
app.use("/api/v1/patients", require("./routes/patientRouter"));
app.use("/api/v1/features", require("./routes/featureRouter"));
app.use("/api/v1/drugusagereports", require("./routes/drugUsageReport.router"));

// Start the cron job
job.start();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
