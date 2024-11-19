const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const { catchAsyncError } = require("../middlewares/catchError");
const jwt = require("jsonwebtoken");

//sign up user
exports.signupUser = catchAsyncError(async (req, res) => {
    const { name, email, password, role, organization_id } = req.body;

    //  Only one Super Admin can be created
    if (role === "Super Admin") {
        const superAdminExists = await User.findOne({ role: "Super Admin" });
        if (superAdminExists) {
            return res.status(400).json({ message: "Super Admin already exists!" });
        }
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: `Email ${email} already in use!`,
        });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword", password, hashedPassword);
    const newSuperAdmin = await new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        organization_id: role === "Super Admin" ? null : organization_id,
    });

    await newSuperAdmin.save();
    return res.status(200).json({
        success: true,
        message: "User Registered Succesfully!",
    });
});


//login user
exports.loginUser = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;
    console.log("body", req.body);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // Check password
    // const isMatch = await user.matchPassword(password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access token
    const access_token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "1d" }
    );

    // Generate refresh token
    const refresh_token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "7d" }
    );

    //save tokens
    user.token_ids = [{ access_token, refresh_token }];
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Login Successful",
        token_ids: { access_token, refresh_token }
    });

});
