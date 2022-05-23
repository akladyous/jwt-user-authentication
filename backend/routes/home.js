
export const home = (req, res, next) => {
    const { email, password } = req.body;
    console.log("path : ", req.path);
    // console.log("session data : ", req.session);
    // console.log("cookies data : ", req.cookies);
    console.log("request ip : ", req.ip);

    req.session.email = email;
    req.session.password = password;

    if (req.session.counter) {
        req.session.counter = req.session.counter + 1;
    } else {
        req.session.counter = 1;
    }

    if (req.session.counter > 3) {
        const error = new Error("custom error");
        error.status = 500;
        next(error);
    } else {
        return res.status(200).json({
            counter: req.session.counter,
        });
    }
}