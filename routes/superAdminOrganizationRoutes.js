const express = require('express');
const userAuthProtect = require('../middlewares/protectedRoute');
const userRoleMiddleware = require('../middlewares/userRoleRoute');
const { createOrganization, getAllOrganizations, deleteOrganization } = require('../controllers/superAdminOrganizationController');

const super_admin_router = express.Router();

super_admin_router.post('/create', userAuthProtect, userRoleMiddleware(['Super Admin']), createOrganization);
super_admin_router.get('/get', userAuthProtect, userRoleMiddleware(['Super Admin']), getAllOrganizations);
super_admin_router.delete('/delete/:id', userAuthProtect, userRoleMiddleware(['Super Admin']), deleteOrganization);

module.exports = super_admin_router;