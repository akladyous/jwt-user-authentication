import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/Users.js";
import { JWT_SECRET } from "../../config/env.js";

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res
            .status(409)
            .json({ error: { message: "Missing e-mail and password" } });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(409)
            .json({ error: { message: "Unauthorized User - user not found" } });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res
            .status(500)
            .json({ error: { message: "Unauthorized User - wrong password" } });
    }

    res.status(200).json(user._id)
    // jwt.sign(
    //     { id: user._id.toString(), email: user.email, active: user.active },
    //     JWT_SECRET,
    //     {expiresIn: "1d"},
    //     (err, token) => {
    //         if (err) {
    //             return res.status(500).json(err)
    //         }
    //         res.status(200).json({token})
    //     }
    // )
};
