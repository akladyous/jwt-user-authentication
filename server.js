import express from "express";
import path from 'path'
import handleCors from "./config/cors.js";
import {router as indexRoute} from './routes/index.js'
import { delay } from './routes/delay.js'


const app = express();
const PORT = 4000;
app.listen(PORT, () =>{
    console.log(`ExpressJS is listening on port ${PORT}`);
})

// custom logger middleware
app.use((req, res, next) =>{
    console.log(
        "\x1b[33m%s\x1b[0m",
        `Http Verb: ${req.method} Path: ${req.path} ${req.url} ${req.headers.origin} ${req.headers}`
    );
    req.headers.origin = req.headers.origin || req.headers.host
    // console.log("header: ", req.headers);
    next();
});
app.use(handleCors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use("/", indexRoute);
app.use("/delay", delay);
