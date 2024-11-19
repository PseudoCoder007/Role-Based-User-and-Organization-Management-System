const asyncHandler = require("express-async-handler");


const userRoleMiddleware = (roles) => asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied!" });
    }
    next();
  });
  
  module.exports = userRoleMiddleware;