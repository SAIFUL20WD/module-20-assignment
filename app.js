const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const { xss } = require('express-xss-sanitizer');
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
.then((res) => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(xss());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.use("/api/sales", router);


module.exports = app;