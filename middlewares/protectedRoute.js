const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");

const userAuthProtect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token",
        })
    }
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            const userId = await User.findById(decoded.id).select("-password");
            req.user = userId;
            console.log(req.user,"token");
            next();
        } catch (err) {
            res.status(401).json({ message: "Token is not valid" });
        }
    }
});

module.exports = userAuthProtect;