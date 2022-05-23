import dotenv from 'dotenv';

dotenv.config();

const SESSION_TIMEOUT = 1000 * 60 * 60 * 24;
const DATABASE_URI = process.env.DATABASE_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_NAME = process.env.SESSION_NAME;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT;

export {
    DATABASE_URI,
    JWT_SECRET,
    SESSION_NAME,
    SESSION_SECRET,
    SESSION_TIMEOUT,
    PORT,
}

// export const {
//     SESSION_NAME = "session",
//     SESSION_SECRET = "klkjlk23j4lk2j342bkh34",
//     SESSION_TIMEOUT = timeout,
// } = process.env;
