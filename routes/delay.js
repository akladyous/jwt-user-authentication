import express from "express";

export const delay = express.Router();

export const sleep = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};


delay.get("/:num", (req, res) =>{
    const { num } = req.params;
    const start = performance.now();

    sleep(num).then( ()=>{
        const end = performance.now();
        const elapsedTime = Number.parseFloat(end - start).toFixed(2);

        res.status(200).json({
            message: `delayed ${elapsedTime}μ`,
        });
    })
} )
