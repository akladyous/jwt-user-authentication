import path from 'path'
export const errorHandler = (err, req, res, next) =>{
    // console.log("\x1b[31m%s\x1b[0m", `Error Stack -> ${err.stack}`);
    console.log("\x1b[33m%s\x1b[0m", `Error Message -> ${err.message}`);
    res.status(500);
    console.log(req.is("html"));
    console.log(req.accepts('html'))
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'..' ,'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({'Error': err.message});
    } else {
        res.type('text').send(err)
    }
};