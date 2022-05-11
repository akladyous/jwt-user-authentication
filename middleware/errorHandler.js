import path from 'path'

export const errorHandler = (err, req, res, next) =>{
    // console.log("\x1b[31m%s\x1b[0m", `Error Stack -> ${err.stack}`);

    // console.log("headers: ", req.headers)
    // console.log("content-type : ", req.get('content-type'));
    // console.log("content-type : ", req.headers['content-type']);
    // console.log("accepts : ", req.get("Accept"));
    // console.log("set header to json", req.accepts("application/json")); 
    // console.log("accepts : ", req.get("Accept"));
    // console.log(req.is("html"));
    // res.status(400);
    // const accept = req.accepts(['html', 'json'])
    // if (accept === 'html'){
    //     res.sendFile(path.join(__dirname, 'views', '404.html'));
    // } else if (accept ==='json'){
    //     res.json({error: '404 Not Found'});
    // } else {
    //     res.type('txt').send('404 not found')
    // }

    console.log("\x1b[33m%s\x1b[0m", `Error Message -> ${err.message}`);
    res.status(err.status || 500).json({'error': err.message, status: err.status});
};
