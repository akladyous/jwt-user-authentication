import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/Users.js';
import { JWT_SECRET } from "../../config/env.js";

export const signin = async (req, res, next) => {
    const error = new Error('Unauthorized user')
    error.status = 401
    const { email, password } = req.body;

    if (!email && !password) {
        return next(error)
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(409).json({ error: "Unauthorized User" });
    };

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword){
        return res.status(500).json({ error: 'Unauthorized User' });
    }
    jwt.sign(
        { id: user._id.toString(), email: user.email, active: user.active },
        JWT_SECRET,
        {expiresIn: "1d"},
        (err, token) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json({token})
        }
    )
};

