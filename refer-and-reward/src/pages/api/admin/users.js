import User from '../../../../models/user';
import dbConnect from '../../../../middleware/mongoose';
import authMiddleware from '../../../../middleware/auth';
import { errorResponse, successResponse } from '../../../../utils/response';

export default authMiddleware(async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { search, sortBy, sortOrder, page, pageSize } = req.query;

        // Apply search, sorting, and pagination
        const query = { role: 1 };
        if (search) {
          query.$or = [
            { firstName: { $regex: new RegExp(search, 'i') } },
            { lastName: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } },
            { phone: { $regex: new RegExp(search, 'i') } }
          ];
        }
        const users = await User.find(query)
          .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize);

        res.status(200).json(successResponse("User listed successfully", users));
      } catch (error) {
        res.status(400).json(errorResponse("Something went wrong", 400));
      }
      break;
    default:
      res.status(400).json(errorResponse("Something went wrong", 400));
      break;
  }
}, true);
