import express from "express";
import path from 'path'
import handleCors from "./config/cors.js";
import {router as indexRoute} from './routes/index.js'
import { delay } from './routes/delay.js'
import { errorHandler } from "./middleware/errorHandler.js";


const app = express();
const PORT = 4000;


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

app.use("/", indexRoute);
app.use("/delay", delay);

app.all("*", (req, res, next) =>{
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
    // console.log("content type:", req.headers["content-type"]);
    // console.log("request 1: ", req)
    // next(new Error('page not found'))
    res.status(400);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({error: '404 Not Found'});
    } else {
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`ExpressJS is listening on port ${PORT}`);
});