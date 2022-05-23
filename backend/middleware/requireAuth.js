import Auth from "../util/auth.js";

export const requireAuth = (req, res, next) => {
    // const token = req.cookies.token;
    const token = req.session.token

    if (token) {
        Auth.jwtVerify(token)
            .then((decodedToken) => {
                console.log("decodedToken : ", decodedToken);
                req.session.token = token
                next();
            })
            .catch((error) => {
                error.status = 500
                error.message = 'invalid token'
                next(error);
            });
    } else {
        // res.cookie("token", "", { maxAge: 1 });
        res.cookie("app.sid", "", { maxAge: 1 });
        req.session.destroy();
        const error = new Error('User Authentication Error - Invalid session ID')
        error.status = 500
        next(error)
    }

};
