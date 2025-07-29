const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the request header (conventionally 'x-auth-token')
  const token = req.header('x-auth-token');

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify the token
  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user payload to the request object
    req.user = decoded.user;
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    // If token verification fails, return an invalid token error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
