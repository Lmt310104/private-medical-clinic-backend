import express from "express";
import cors from "cors";
import { connection } from "./config/connectDB";
const auth = require("./middleware/passport");
const app = express();
const PORT = process.env.PORT || 8888;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const secretSessionKey = process.env.SECRET_SESSION_KEY;
import { authenticateAccessToken } from "./middleware/jwt";
connection();

app.use(cookieParser());

app.use(
  session({
    secret: secretSessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
    proxy: true,
  })
);

app.use(auth.initialize());
app.use(auth.session());
//db connection

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.get("/", authenticateAccessToken, function (req, res) {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
  res.json({ id: "hihihi" });
});

app.use("/api/v1/auth", require("./routes/authRouter"));
app.use("/api/v1/drugs", require("./routes/drugRouter"));
app.use("/api/v1/arguments", require("./routes/argumentRouter"));
app.use("/api/v1/units", require("./routes/unitRouter"));
app.use("/api/v1/diseases", require("./routes/diseaseRouter"));
app.use("/api/v1/usage", require("./routes/usageRouter"));
app.use("/api/v1/users", require("./routes/userRouter"));
app.use("/api/v1/patients", require("./routes/patientRouter"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
