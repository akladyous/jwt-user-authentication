import express from "express";
import mongoose from "mongoose";
import path from 'path'
import handleCors from "./config/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { dbConnect } from "./config/dbConnect.js";
import { root, delay, users } from './routes/routes.js';
import session from "express-session"

dbConnect();
const app = express();
const PORT = 4000;


app.use(session({
    httpOnly: true,
    sameSite: false,
    name: "mySession",
    keys: ["uno", "due"],
    secret: "ciao a tutti",
    secret: "supersecret difficult to guess string",
    cookie: {},
    resave: false,
    saveUninitialized: false,
    sameSite: true,
}))

// custom logger middleware
app.use((req, res, next) =>{
    console.log(
        "\x1b[33m%s\x1b[0m",
        `Server Logger: Http Verb -> ${req.method} Path: ${req.path}`
    );
    req.headers.origin = req.headers.origin || req.headers.host
    // console.log("header: ", req.headers);
    next();
});
app.use(handleCors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use("/", root);
app.use("/delay", delay);
app.use("/api", users)

app.use("/home", (req, res, next) =>{
    req.session.user = 'guest'
    return res.status(200).sendFile(path.join(__dirname, 'views', 'home.html'))
})

app.all("*", (req, res, next) =>{
    const error = new Error('path not found')
    error.status = 500
    next(error);
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("\x1b[33m%s\x1b[0m", "mongoDB successfully connected");
    app.listen(PORT, () => {
        console.log(
            "\x1b[33m%s\x1b[0m",
            `ExpressJS is listening on port ${PORT}`
        );
    });
});
