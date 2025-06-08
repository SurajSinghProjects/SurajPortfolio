// Import necessary modules and models
import dbConnect from "../../../middleware/mongoose";
import User from "../../../models/user";
import authMiddleware from '../../../middleware/auth';
import { errorResponse, successResponse } from "../../../utils/response";
import jwt from "jsonwebtoken";

export default authMiddleware(async function getUserDetailHandler(req, res) {

    try {
        await dbConnect();

        // Extract the token from the request headers
        const token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(errorResponse("Unauthorized - Token not provided"));
        }

        try {
            // Verify the token
            const decodedToken = jwt.verify(token, process.env.SECRET_JWTKEY);

            // Use the information from the token to fetch the user details
            const user = await User.findOne({ email: decodedToken.email }).select('-password');
            if (!user) {
                return res.status(404).json(errorResponse("User not found"));
            }
            res.status(200).json(successResponse("User detail get successfully", user));
        } catch (tokenError) {
            return res.status(401).json(errorResponse("Unauthorized - Invalid token"));
        }
    } catch (error) {
        res.status(500).json(errorResponse('Internal Server Error'));
    }
}, true);
