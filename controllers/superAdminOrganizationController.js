const { catchAsyncError } = require("../middlewares/catchError");
const Organization = require("../models/organizationSchmea");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

//create new organization controller
exports.createOrganization = catchAsyncError(async (req, res) => {
    const sueprAdminId = req.user.id;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Organization name is required!" });
    }
    
    const superAdmin = await User.findById(sueprAdminId);
    if (!superAdmin) {
        return res.status(401).json({
            status: false,
            message: "Super admin not found!"
        });
    }

     // Check if the name already exists
     const existingOrganization = await Organization.findOne({ name });
     if (existingOrganization) {
         return res.status(400).json({
             message: "Organization name already exists. Please choose a different name!"
         });
     }
    //new organization
    const organization = new Organization({
        name,
        created_by: superAdmin._id,
    });

    await organization.save();
    res.status(201).json({
        message: "Organization created successfully!",
        data: organization
    });
});

//get all organizations controller
exports.getAllOrganizations = catchAsyncError(async (req, res) => {
    const sueprAdminId = req.user.id;
    const { page = 1 , limit = 10, search = "", role, sort = "name", order="asc"} = req.query;
    const  skip = (page - 1)*limit;

    const superAdmin = await User.findById(sueprAdminId);
    if (!superAdmin) {
        return res.status(401).json({
            status: false,
            message: "Super admin not found!"
        });
    }

    const query = {};
    if (search) {
        query.name = { $regex: search, $options: "i" }; 
        query.email = { $regex: search, $options: "i" };
    }

    const organizations = await Organization.find(query)
    .sort({ [sort]: order === "asc" ? 1 : -1 }) 
    .skip(parseInt(skip))
    .limit(parseInt(limit));

    const totalOrganizations = await Organization.countDocuments(query);

    return res.json({
        success: true,
        message: "Organizations fetched successfully!",
        data: organizations,
        pagination: {
            total: totalOrganizations,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalOrganizations / limit),
            limit: parseInt(limit),
        },
    });
});

//delete organizations controller
exports.deleteOrganization = catchAsyncError(async (req, res) => {
    const organization_id = req.params.id;
    const sueprAdminId = req.user.id;
    const superAdmin = await User.findById(sueprAdminId);
    if (!superAdmin) {
        return res.status(401).json({
            status: false,
            message: "Super admin not found!"
        });
    }
    const organization = await Organization.findByIdAndDelete(organization_id);
    if (!organization) {
        return res.status(404).json({
            status: false,
            message: "Organization not found!"
        });
    }
    return res.json({
        success: true,
        message: "Organization deleted successfully!",
        data: organization
    });
});