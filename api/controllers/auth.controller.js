import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'))
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save();
        res.status(201).json({
            "message": 'Signup successful',
            "success": true
        })
    } catch (error) {
        next(error)
    }

}
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || email == '' || !password || password == '') {
        next(errorHandler('400', 'All fields are required'))
    }
    try {
        const validuser = await User.findOne({ email })
        if (!validuser) {
            return next(errorHandler(404, 'User not Found'))
        }
        const validPassword = bcryptjs.compareSync(password, validuser.password);
        if (!validPassword) {
            return next(errorHandler(404, 'Invalid credenctial'))
        }
        const token = jwt.sign(
            {
                id: validuser._id,

            },
            process.env.JWT_SECERET,
            { expiresIn: '1d' }
        )
        const { password: pass, ...rest } = validuser._doc
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)
    } catch (error) {
        next(error)
    }
}

