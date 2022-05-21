import jwt from "jsonwebtoken";
import { dbConnect } from "../../config/dbConnect.js";
import { User } from "../../models/Users.js";
import { JWT_SECRET } from "../../config/env.js";
import ApiError from "../../util/ApiError.js";

// import { v4 as uuid} from 'uuid';

const handleErrors = (err) => {
    if (err.code === 11000) {
        return { error: "Email already exists" };
    }
    let errors = { email: "", password: "" };
    if (err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
const JsonWebToken = {
    secret: JWT_SECRET,
    expiration: '1d',
    sign: function(payload){
        return new Promise((resolve, reject) => {
            jwt.sign(
                {payload}, 
                this.secret, 
                { expiresIn: this.expiration },
                (error, token) =>{
                    if (error) {
                        reject(new Error(error));
                    } else {
                        resolve(token)
                    }
                }
            );
        });

    }
}

export const signup = async (req, res, next) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
        return res
            .status(409)
            .json({ error: { message: "User already Exists" } });
    }

    try {
        const user = await User.create({ email, password });
        const token = await JsonWebToken.sign(user._id)
        req.session.cookie.token = token
        // res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 1 * 24 * 60 * 60})
        res.status(201).json(token);
    } catch (error) {
        let err = handleErrors(error);
        // next(new ApiError('user authentication', 500, handleErrors(error)))
        // next(new Error(error.message.split(",")));
        // return res.status(500).json({ error: error.message.split(",") });
        return res.status(409).json({error: err})
        
    }

    // const hashPassword = await bcrypt.hash(password, 10)
    // const user = User.create(
    //     {
    //         email: email,
    //         password: hashPassword,
    //     },
    //     (err, user) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(500).send({ error: err.message });
    //         }
    //         console.log("User successfully created");
    //         console.log("user: ", user);
    //     }
    // );
    // jwt.sign(
    //     { email, password },
    //     JWT_SECRET,
    //     { expiresIn: "2d" },
    //     (err, token) => {
    //         if (err) {
    //             return res.status(500).json({err});
    //         }
    //         res.status(201).json({token});
    //     }
    // );
};
