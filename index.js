import express from "express";
const app = express();
import {router as indexRoute} from './src/routes/index.js'
const PORT = 4000;


app.listen(PORT, () =>{
    console.log(`ExpressJS is listening on port ${PORT}`);
})

app.use(express.json());
app.use("/", indexRoute);

