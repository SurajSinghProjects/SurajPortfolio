import dbConnect from "../../../../middleware/mongoose";
import User from "../../../../models/user";
import { generateRandomCode } from "../../../../generateReferralLink";
import { errorResponse, successResponse } from "../../../../utils/response";
import validator from 'validator';
import Referred from "../../../../models/referred";
import requestIp from 'request-ip';

var CryptoJS = require("crypto-js");

async function handler(req, res) {
  try {
    await dbConnect();
    const ipAddress = requestIp.getClientIp(req);
    const { promocode } = req.body;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (promocode) {
      const referrerUserData = await User.findOne({ referralCode: promocode })
      if (!referrerUserData) {
        return res.status(400).json(errorResponse('Invalid Link'));
      }
      const referrerUserId = referrerUserData._id;

      if (req.method === "POST") {
        const { firstName, lastName, email, password, phone, address } = req.body;

        if (!firstName) {
          return res.status(400).json(errorResponse('First name is required'));
        }

        if (!lastName) {
          return res.status(400).json(errorResponse('Last name is required'));
        }

        if (!validator.isEmail(email)) {
          return res.status(400).json(errorResponse('Invalid email address'));
        }

        if (!validator.isLength(password, { min: 6 })) {
          return res.status(400).json(errorResponse('Password must be at least 6 characters long'));
        }

        if (!specialCharacterRegex.test(password)) {
          return res.status(400).json(errorResponse('Password must contain at least one special character'));
        }

        if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
          return res.status(400).json(errorResponse('Invalid phone number'));
        }

        if (!address) {
          return res.status(400).json(errorResponse('Address is required'));
        }

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        const existingUserPhone = await User.findOne({ phone: phone });
        if (existingUserPhone?.phone) {
          return res.status(400).json(errorResponse('User with this phone already exists'));
        }
        if (existingUser) {
          return res.status(400).json(errorResponse('User with this email already exists'));
        }

        // If the user doesn't exist, create a new user
        let user = new User({
          firstName,
          lastName,
          email,
          password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
          phone,
          address,
          referralCode: generateRandomCode(),
          ipAddress
        });

        await user.save();
        const referredUserId = user._id;

        let referredUser = new Referred({
          referrerUserId,
          referredUserId
        });

        await referredUser.save();
        res.status(200).json(successResponse("User registered successfully"));
      } else {
        res.status(500).json(errorResponse('Internal Server Error'));
      }
    }
    else {
      if (req.method === "POST") {
        const { firstName, lastName, email, password, phone, address } = req.body;

        if (!firstName) {
          return res.status(400).json(errorResponse('First name is required'));
        }

        if (!lastName) {
          return res.status(400).json(errorResponse('Last name is required'));
        }

        if (!validator.isEmail(email)) {
          return res.status(400).json(errorResponse('Invalid email address'));
        }

        if (!validator.isLength(password, { min: 6 })) {
          return res.status(400).json(errorResponse('Password must be at least 6 characters long'));
        }

        if (!specialCharacterRegex.test(password)) {
          return res.status(400).json(errorResponse('Password must contain at least one special character'));
        }

        if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
          return res.status(400).json(errorResponse('Invalid phone number'));
        }

        if (!address) {
          return res.status(400).json(errorResponse('Address is required'));
        }

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        const existingUserPhone = await User.findOne({ phone: phone });
        if (existingUserPhone?.phone) {
          return res.status(400).json(errorResponse('User with this phone already exists'));
        }

        if (existingUser) {
          return res.status(400).json(errorResponse('User with this email already exists'));
        }

        // If the user doesn't exist, create a new user
        let user = new User({
          firstName,
          lastName,
          email,
          password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
          phone,
          address,
          referralCode: generateRandomCode(),
          ipAddress
        });

        await user.save();

        res.status(200).json(successResponse("User registered successfully"));
      } else {
        res.status(500).json(errorResponse('Internal Server Error'));
      }
    }

  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json(errorResponse('Internal Server Error'));
  }
}

export default handler;
