import  ApiError  from './util/ApiError.js'
import express from "express";
import mongoose from "mongoose";
import path from "path";
import handleCors from "./config/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { dbConnect } from "./config/dbConnect.js";
import { root, delay, users } from "./routes/routes.js";
import session from "express-session";

dbConnect();
const app = express();
const PORT = 4000;

app.use(
    session({
        // name: "mySession",
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            // maxAge: 1000 * 60 * 60 * 24,
            maxAge: 1000 * 60,
            httpOnly: true,
            secure: false,
            sameSite: true,
        },
    })
);

// custom logger middleware
app.use(logger);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    req.headers.origin = req.headers.origin || req.headers.host;
    next();
});
app.use(handleCors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", root);
app.use("/delay", delay);
app.use("/api", users);

app.get("/home", (req, res, next) => {
    const { email, password } = req.body;

    console.log("req.session: ", req.session);
    console.log("--------------------------");
    console.log("req.session.cookie ", req.session.cookie);
    console.log("--------------------------");
    console.log("req.headers.cookie : ", req.headers.cookie);
    req.session.email = email;

    if (req.session.counter) {
        req.session.counter = req.session.counter + 1;
    } else {
        req.session.counter = 1;
    }

    if (req.session.counter > 3) {
        const customError = new Error("test error");
        customError.name = "custom error name";
        customError.message = "custom error message";
        customError.code = 500;
        customError.status = 400;
        // return next(customError);
        throw new ApiError("error name", 500, "error message");
    }
    return res.status(200).json(req.session.counter);
    // res.send(`<h1> session: ${req.session.counter} </h1>`);
    // return res.status(200).sendFile(path.join(__dirname, 'views', 'home.html'))
});

app.all("*", (req, res, next) => {
    if (req.originalUrl.includes("favicon.ico")) {
        return res.status(204).end();
    }
    const customError =  new ApiError('Routing Error', 404, 'Path not found')
    next(customError);
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("\x1b[33m%s\x1b[0m", "mongoDB successfully connected");
    app.listen(PORT, () => {
        console.log(
            "\x1b[34m%s\x1b[0m",
            `ExpressJS is listening on port ${PORT}`
        );
    });
});
