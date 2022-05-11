import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbConnect } from '../../config/dbConnect.js';
import { User } from '../../models/Users.js';
import { JWT_SECRET } from "../../config/env.js";
// import { v4 as uuid} from 'uuid';


export const signup = async (req, res, next) => {

    const { email, password } = req.body;

    const userExists = await User.findOne({ email: email}).exec();
    if (userExists) {
        return res.status(409).send({ error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = User.create(
        {
            email: email,
            password: hashPassword,
        },
        (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ error: err.message });
            }
            console.log("User successfully created");
            console.log("user: ", user);
        }
    );
    jwt.sign(
        { email, password },
        JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
            if (err) {
                return res.status(500).json({err});
            }
            res.status(201).json({token});
        }
    );
}



