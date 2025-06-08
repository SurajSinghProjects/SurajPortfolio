import Referred from '../../../../../models/referred';
import dbConnect from '../../../../../middleware/mongoose';
import authMiddleware from '../../../../../middleware/auth';
import { successResponse, errorResponse } from '../../../../../utils/response';
import User from '../../../../../models/user';

export default authMiddleware(async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { search, sortBy, sortOrder, page, pageSize, referredId } = req.query;
        const query = { referrerUserId: referredId };
        const referred = await Referred.find(query).lean();

        if (referred.length === 0) {
          return res.status(200).json(successResponse('No Referred user', referred));
        }

        const referrerId = referred[0].referrerUserId
        const referrerCode = await User.find({ _id: referrerId }).select('referralCode')

        let referredUserData = [];

        // Loop through referred users
        for (let i = 0; i < referred.length; i++) {
          // Find user data for each referred user
          const data = await User.findOne({ _id: referred[i].referredUserId });

          // Apply search criteria
          if (
            search &&
            !(
              data.firstName.includes(search) ||
              data.lastName.includes(search) ||
              data.email.includes(search) ||
              data.phone.includes(search)
            )
          ) {
            continue; // Skip if the search criteria are not met
          }
          referredUserData.push(data);
        }

        // Apply sorting
        referredUserData.sort((a, b) => {
          const fieldA = a[sortBy];
          const fieldB = b[sortBy];

          if (sortOrder === 'asc') {
            return fieldA.localeCompare(fieldB);
          } else {
            return fieldB.localeCompare(fieldA);
          }
        });

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = referredUserData.slice(startIndex, endIndex);

        res.status(200).json(successResponse('Referred users listed successfully', { paginatedData, referrerCode }));
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json(errorResponse('Internal Server Error'));
      }
      break;
    default:
      res.status(400).json(errorResponse('Bad request'));
      break;
  }
}, true);
