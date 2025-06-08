import jwt from 'jsonwebtoken';

export default function authMiddleware(handler, requireAuth = true) {
  return async (req, res) => {
    if (requireAuth) {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }

      try {
        const decoded = jwt.verify(token, process.env.SECRET_JWTKEY);
        req.user = decoded;
        return handler(req, res);
      } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ success: false, error: 'Invalid token' });
      }
    } else {
      return handler(req, res);
    }
  };
}
