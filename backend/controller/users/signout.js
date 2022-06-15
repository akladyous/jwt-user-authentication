import { SESSION_NAME } from "../../config/env";
import { User } from "../../models/Users.js";

export const signout = async (req, res) => {

    // if (!req.cookies?.token) {
    //     return res
    //         .status(204)
    //         .json({ error: "User Authorization Error: Unable to logout" });
    // }
    // const refreshToken = req.cookies.token;
    
    if (!req.session.token) {
        return res
            .status(204)
            .json({ error: "User Authorization Error: Unable to logout" })
    }
    const refreshToken = req.session.token;

    const userExists = await User.findOne({ refreshToken }).exec();
    if (!userExists) {
        // res.cookie('token', '', { maxAge: 1 })
        // res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
        req.session.destroy()    
        return res
            .status(204)
            .json({ error: "User Authorization Error: User not found" });
    }

    userExists.refreshToken = null;
    await userExists.save();

    // res.cookie('token', '', { maxAge: 1 })
    // res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true});

    res.cookie(SESSION_NAME, '', { maxAge: 1 })
    res.clearCookie(SESSION_NAME, { path: '/', httpOnly: true, sameSite: 'None', secure: true });
    req.session.destroy();

    res.status(200).json({ message: 'Logout successful completed' })
}