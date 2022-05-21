import cors from "cors";

const whileList = [
    "127.0.0.1:4000",
    "127.0.0.1:3000",
    "localhost:3000",
    "localhost:4000",
    "https://127.0.0.1:4000",
    "https://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:4000",
    "https://www.google.com",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whileList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Request blocked by CORS policy"), false);
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

const handleCors = () =>{
    return cors(corsOptions);
};

export default handleCors;