import Auth from "../util/auth.js";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

export const verifyJWT = (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) res.status(401).json({ error: "Authentication Error - missing authorization token" });
    
    const token = authorization.split(' ')[1];

    Auth.jwtVerify(token, ACCESS_TOKEN_SECRET)
        .then((decoded) => {
            // console.log("decodedToken : ", decoded);
            req.user = decoded.email;
            next();
        })
        .catch((error) => {
            // return res.sendStatus(403);
            return res.status(403).json({ error: "Authentication Error - invalid token" });
        });
};