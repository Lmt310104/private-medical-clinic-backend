import express from "express";
import cors from "cors";
import { connection } from "./config/connectDB";
const auth = require("./middleware/passport");
const app = express();
const PORT = process.env.PORT || 8888;
const session = require("express-session");
const secretSessionKey = process.env.SECRET_SESSION_KEY;
connection();
app.use(
  session({
    secret: secretSessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
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
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/auth", require("./routes/authRouter"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
