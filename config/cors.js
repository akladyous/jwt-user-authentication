import cors from "cors";

const whileList = [
    '127.0.0.1:4000',
    'https://www.google.com',
    'localhost:4000',
];

const corsOptions = {
    origin: (origin, callback) => {
        console.log("origin: ", origin)
        if (whileList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback("not allowed!!!", false);
        }
    },
    optionsSuccessStatus: 200,
};

const handleCors = () =>{
    return cors(corsOptions);
};

export default handleCors;