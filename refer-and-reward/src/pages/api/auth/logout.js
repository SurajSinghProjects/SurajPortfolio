import authMiddleware from "../../../../middleware/auth";
import { errorResponse, successResponse } from "../../../../utils/response";

// Array to store invalidated tokens
const invalidatedTokens = [];

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get the token from the request
      const token = req.headers.authorization?.replace('Bearer ', '');

      // Check if the token is already invalidated
      if (invalidatedTokens.includes(token)) {
        return res.status(401).json(errorResponse('Token already invalidated'));
      }

      // Invalidate the token by adding it to the array
      invalidatedTokens.push(token);

      // Respond with a success message
      res.status(200).json(successResponse('Logout successful'));
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json(errorResponse('Internal Server Error'));
    }
  } else {
    res.status(400).json(errorResponse('Bad request'));
  }
}

export default authMiddleware(handler, true);
