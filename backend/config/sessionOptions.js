import { SESSION_NAME, SESSION_SECRET, SESSION_TIMEOUT } from "./env.js";

export const sessionOptions = {
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
        maxAge: SESSION_TIMEOUT,
        httpOnly: true,
        secure: false,
        sameSite: true,
    },
};