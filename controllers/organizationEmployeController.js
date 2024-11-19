const { catchAsyncError } = require("../middlewares/catchError");
const User = require("../models/userSchema");

//get employee profile
exports.getEmployeeProfile = catchAsyncError(async (req, res) => {
    const employeeId = req.user.id;
    const employee = await User.findById(employeeId);
    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found!"
        });
    }

    return res.json({
        success: true,
        message: "Employee profile fetched successfully!",
        data: employee
    });
});

//update employee profile
exports.updateEmployeeProfile = catchAsyncError(async (req, res) => {
    const employeeId = req.user.id;
    const { name, email} = req.body;

    if (!name && !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required!"
        });
    }
    const employee = await User.findByIdAndUpdate(employeeId, { name, email }, { new: true });
    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found!"
        });
    }

    return res.json({
        success: true,
        message: "Employee profile updated successfully!",
        data: employee
    });
});