const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/auth.router.js");
const musicRouter = require("./routers/music.router.js");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/music", musicRouter);

module.exports = app;