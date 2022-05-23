import Auth from "../../util/auth.js";
import { User } from "../../models/Users.js";

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
    return { ...errors, message: err.message };
};

export const signup = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res.status(409).json({error: 'Missing email or password'})
    }

    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
        return res
            .status(409)
            .json({ error: { message: "User already Exists" } });
    }

    try {
        const user = await User.create({ email, password });
        const token = await Auth.jwtSign({ id: user._id, email: user.email });
        req.session.token = token
        // res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 1 * 24 * 60 * 60})
        res.status(201).json(token);
    } catch (error) {
        let customError = handleErrors(error);
        customError.status = 409
        // next(new Error(error.message.split(",")));
        // return res.status(500).json({ error: error.message.split(",") });
        console.log('error : ', error)
        return res.status(409).json({error: customError})
        
    }

};
