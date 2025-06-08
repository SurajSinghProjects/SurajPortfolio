import dbConnect from "../../../../middleware/mongoose";
import User from "../../../../models/user";
import authMiddleware from '../../../../middleware/auth';
import { errorResponse } from "../../../../utils/response";
import validator from 'validator';

var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

async function loginHandler(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { email, password } = req.body;
      const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

      if (!validator.isEmail(email)) {
        return res.status(400).json(errorResponse('Invalid email address'));
      }

      if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json(errorResponse('Password is required'));
      }

      if (!specialCharacterRegex.test(password)) {
        return res.status(400).json(errorResponse('Password must contain at least one special character'));
      }

      try {
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
          return res.status(400).json(errorResponse("No user found"));
        }

        // Check if the user object has the expected password property
        if (!user.password) {
          return res.status(400).json(errorResponse("User password not found"));
        }

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

        // Check if the decryption was successful
        if (!decryptedPassword) {
          return res.status(500).json(errorResponse('Error decrypting password'));
        }

        const decryptedPassString = decryptedPassword.toString(CryptoJS.enc.Utf8);

        if (password === decryptedPassString) {
          let token = jwt.sign(
            { email: user.email, name: user.name },
            process.env.SECRET_JWTKEY,
            { expiresIn: '2d' }
          );
          res.status(200).json({ success: true, message: "Login Successful", token });
        } else {
          res.status(400).json(errorResponse("Invalid Credentials"));
        }
      } catch (error) {
        console.error("User retrieval error:", error);
        res.status(500).json(errorResponse('Internal Server Error'));
      }
    } else {
      res.status(404).json(errorResponse("Bad request"));
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json(errorResponse('Internal Server Error'));
  }
}

export default authMiddleware(loginHandler, false);
