import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./config/connectDB";
const auth = require("./middleware/passport");
const app = express();
const PORT = process.env.PORT || 8888;
const session = require("express-session");
const secretSessionKey = process.env.SECRET_SESSION_KEY;
const job = require("../src/utils/saveData");

//connect to database
connection();

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
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
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", "true"); // Thiết lập Access-Control-Allow-Credentials thành true
//   next();
// });

app.use(express.urlencoded({ extended: true }));

//routes

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
app.use("/api/v1/patients", require("./routes/patientRouter"));
app.use("/api/v1/features", require("./routes/featureRouter"));
app.use("/api/v1/drugusagereports", require("./routes/drugUsageReport.router"));

// Start the cron job
job.start();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
