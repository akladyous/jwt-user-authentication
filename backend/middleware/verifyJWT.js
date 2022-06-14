import Auth from "../util/auth.js";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

export const verifyJWT = (req, res, next) => {
    // console.log("request headers: ", req.headers);
    const { authorization } = req.headers;
    if (!authorization) {
        console.log("\x1b[30m%s\x1b[0m", "User Authorization Error: Missing Token");
        return res.status(401).json({ error: "Authentication Error - missing authorization token" });
    }
    
    const token = authorization.split(' ')[1];
    console.log('token : ', token)

    Auth.jwtVerify(token, ACCESS_TOKEN_SECRET)
        .then((decoded) => {
            console.log(`time now   : ${new Date()}\nexpiration : ${new Date((decoded.exp * 1000))}`)
            req.user = decoded.email;
            next();
        })
        .catch((error) => {
            // return res.sendStatus(403);
            return res.status(403).json({ error: `Token expired at: ${error.expiredAt}` });
        });
};