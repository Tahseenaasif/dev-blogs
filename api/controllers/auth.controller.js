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

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    console.log("this is req.body",req.body);
    try {
      const user = await User.findOne({ email });
      if (user) {
        console.log("this if part hit's")
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECERET,
        );
        console.log("this if part hit's",token)
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        console.log("this else part hit's")
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
          console.log("this is generated password",generatedPassword);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        console.log("hashedPassword",hashedPassword);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id},
          process.env.JWT_SECERET,
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

