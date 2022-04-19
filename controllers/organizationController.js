const OrganizationService = require('../services/organizationService');

class OrganizationController {
    async create(req, res, next) {
        try {
            const {name, description} = req.body;
            const organization = await OrganizationService.createOrganization(name, description);
            res.status(200).json(organization);
        } catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const organization = await OrganizationService.getOrganizationById(id);
            res.status(200).json(organization);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const userOrgId = req.user.organizationId;
            const organizations = await OrganizationService.getOrganizations(userOrgId);
            res.status(200).json(organizations);
        } catch (e) {
            next(e);
        }
    }

    async getMyOrganization(req, res, next) {
        try {
            const user = req.user;
            const organizations = await OrganizationService.getOrganizationById(user.organizationId);
            res.status(200).json(organizations);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new OrganizationController();