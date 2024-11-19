const express = require('express');
const userAuthProtect = require('../middlewares/protectedRoute');
const userRoleMiddleware = require('../middlewares/userRoleRoute');
const { createEmployees, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/adminEmployeeController');

const admin_router = express.Router();

admin_router.post('/create-employee', userAuthProtect, userRoleMiddleware(["Organization Admin"]), createEmployees);
admin_router.get('/get-employees', userAuthProtect, userRoleMiddleware(["Organization Admin"]), getEmployees);
admin_router.put("/update-employee/:id", userAuthProtect, userRoleMiddleware(["Organization Admin"]), updateEmployee);
admin_router.delete("/delete-employee/:id", userAuthProtect, userRoleMiddleware(["Organization Admin"]), deleteEmployee);

module.exports = admin_router;