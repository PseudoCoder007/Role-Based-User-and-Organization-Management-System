const express = require('express');
const userAuthProtect = require('../middlewares/protectedRoute');
const userRoleMiddleware = require('../middlewares/userRoleRoute');
const { getEmployeeProfile, updateEmployeeProfile } = require('../controllers/organizationEmployeController');

const employee_router = express.Router();

employee_router.get('/profile', userAuthProtect, userRoleMiddleware(["Organization Employee"]), getEmployeeProfile);
employee_router.get('/update', userAuthProtect, userRoleMiddleware(["Organization Employee"]), updateEmployeeProfile);

module.exports = employee_router;