const prod: boolean = process.env.NODE_ENV === "production";

!prod && require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// var usersRouter = require("./routes/users");

const app = express();
const port = process.env.PORT || 3000;

!prod && app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// Import Models
import "./models/User";
import indexRouter from "./routes/index";

app.use("/api", indexRouter);
// app.use("/users", usersRouter);

app.listen(port, () => {
	console.log(`Backend listening at http://localhost:${port}`);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	// we're connected!
});
