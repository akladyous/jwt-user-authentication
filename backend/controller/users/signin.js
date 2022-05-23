import { User } from "../../models/Users.js";
import Auth from "../../util/auth.js";

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res
            .status(409)
            .json({ error: { message: "Missing e-mail and password" } });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(409)
                .json({
                    error: { message: "Unauthorized User - user not found" },
                });
        }
        const validPassword = await Auth.isValidPassword(
            password,
            user.password
        );

        if (!validPassword) {
            return res
                .status(500)
                .json({
                    error: { message: "Unauthorized User - wrong password" },
                });
        }
        const token = await Auth.jwtSign({id: user._id, email: user.email});

        req.session.token = token;
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     maxAge: 1000 * 1 * 24 * 60 * 60,
        // });
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
};
