import express from 'express';
import { signup } from './users/signup.js';
import { signin } from './users/signin.js';
export const users = express.Router();

users.get("/users", (req, res) => {
    res.status(200).json({users: "users list"})
});

users.post("/users/signup", signup)
users.post("/users/signin", signin)

users.all("/users/*", (req, res, next) => {
//     console.log("error..");
//         res.status(500).json({message: "error"})
    const error = new Error('Path not found')
    next(error);
})
