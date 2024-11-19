const { catchAsyncError } = require("../middlewares/catchError");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

//add employees
exports.createEmployees = catchAsyncError(async (req, res) => {
    const adminId = req.user.id;
    const { name, email, password } = req.body;

    const admin = await User.findById(adminId);
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found!"
        });
    }

    const existingEmp = await User.findOne({ email: email});
    if( existingEmp){
        return res.status(400).json({
            success: false,
            message: "Email already in use!"
        });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new employee
    const newEmployee = new User({
        name,
        email,
        password: hashedPassword,
        role: 'Organization Employee',
        organization_id: admin._id
    });

    await newEmployee.save();
    res.status(201).json({
        success: true,
        message: "Employee created successfully!",
        employee: newEmployee
    });
});

//get employees
exports.getEmployees = catchAsyncError(async (req, res) => {
    const adminId = req.user.id;
    const { page = 1 , limit = 10, search = "", role, sort = "name", order="asc"} = req.query;
    const  skip = (page - 1)*limit;
    
    const admin = await User.findById(adminId);
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found!"
        });
    }
    
    const query = {
        organization_id: admin._id,
        role: role || 'Organization Employee'
    }
    
    if(search){
        query.name = { $regex: search, $options: 'i' },
        query.email = { $regex: search, $options: 'i' }
    }
    const employees = await User.find(query)
    .sort({ [sort] : order ===  'asc' ? 1 : -1})
    .skip(skip).limit(parseInt(limit));

    const totalEmployees = await User.countDocuments(query);

    res.status(200).json({
        success: true,
        message: "Employees retrieved successfully!",
        data: employees,
        pagination:{
            total: totalEmployees,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalEmployees / limit),
            limit: limit
        }
    });
});

//update employee
exports.updateEmployee = catchAsyncError(async (req, res) => {
    const adminId = req.user.id;
    const { id } = req.params;
    const { name, email } = req.body;
    
    if(!name && !email) {
        return res.status(400).json({
            success: false,
            message: "Name Or email are required for updating employee profile!"
        });
    }
    const admin = await User.findById(adminId);
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found!"
        });
    }

    const employee = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found!"
        });
    }

    res.status(200).json({
        success: true,
        message: "Employee updated successfully!",
        data: employee
    });
});

//delete employee
exports.deleteEmployee = catchAsyncError(async (req, res) => {
    const adminId = req.user.id;
    const { id } = req.params;

    const admin = await User.findById(adminId);
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found!"
        });
    }

    const employee = await User.findByIdAndDelete(id);
    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found!"
        });
    }

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully!"
    });
});