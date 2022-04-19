const bcrypt = require('bcrypt');
const {ADMIN_STATUS} = require('../utils/constants');
const ApiError = require('../exceptions/ApiError');
const AdminModel = require('../models/adminModel');

class AdminService {
    async createAdmin(user, organizationId) {
        const hashPass = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT));
        const admin = await AdminModel.create({
            password: hashPass,
            status: ADMIN_STATUS.ADMIN,
            email: user.email,
            organizationId
        });
        return admin;
    }

    async getAdminByEmailAndPassword(email, password) {
        const adminWithPassword = await AdminModel.findOne({ email }, { password: 1 });
        if (!adminWithPassword) {
            throw ApiError.notFound('Incorrect email');
        }

        const comparePass = await bcrypt.compare(password, adminWithPassword.password);
        if (!comparePass) {
            throw ApiError.badRequest('Incorrect password');
        }

        return AdminModel.findOne({ email });
    }

    async getAdminById(id) {
        const admin = await AdminModel.findById(id);
        if (!admin) {
            throw ApiError.notFound('Undefined user');
        }
        return admin;
    }
}

module.exports = new AdminService();