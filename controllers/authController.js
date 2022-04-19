const AdminService = require('../services/adminService');
const OrganizationService = require('../services/organizationService');
const TokenService = require('../services/tokenService');

class AuthController {
    async registration(req, res, next) {
        try {
            const {
                organization,
                user,
            } = req.body;
            const organizationData = await OrganizationService.createOrganization(organization)
            const admin = await AdminService.createAdmin(user, organizationData._id);
            const tokens = TokenService.generateTokens({
                id: admin._id,
                email: admin.email,
                organizationId: admin.organizationId
            });
            res.status(200).json({
                success: true,
                admin,
                tokens,
            });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const admin = await AdminService.getAdminByEmailAndPassword(email, password);
            const tokens = TokenService.generateTokens({
                id: admin._id,
                email: admin.email,
                organizationId: admin.organizationId
            });
            res.status(200).json({
                admin,
                tokens,
            });
        } catch (e) {
            next(e);
        }
    }

    async authorize(req, res, next) {
        try {
            const user = req.user;
            if  (!user) {
                return res.status(401).json();
            }

            const admin = await AdminService.getAdminById(user.id);
            res.status(200).json(admin);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();