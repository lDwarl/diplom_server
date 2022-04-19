const ApiError = require('../exceptions/ApiError');
const OrganizationModel = require('../models/organizationModel');

class DiscountService {
    async updateDiscountPercent(userOrgId, orgId, percent) {
        const organization = await OrganizationModel.findById(userOrgId);
        if (!organization) {
            throw ApiError.notFound('Your organization not found');
        }

        let alreadyCreated = false;
        const discounts = organization.discounts.map(el => {
            if (el.id === orgId) {
                alreadyCreated = true;
                return { id: orgId, percent };
            }
            return el;
        });

        if (!alreadyCreated) {
            discounts.push({ id:orgId, percent });
        }

        const updatedOrg = await OrganizationModel.findByIdAndUpdate(userOrgId, {
            discounts,
        }, {new: true});
        return updatedOrg;
    }

    async removeDiscount(userOrgId, orgId) {
        const organization = await OrganizationModel.findById(userOrgId);
        if (!organization) {
            throw ApiError.notFound('Your organization not found');
        }

        const discounts = organization.discounts.find(el => el.id !== orgId);
        const updatedOrg = await OrganizationModel.findByIdAndUpdate(userOrgId, {discounts}, {new: true});
        return updatedOrg;
    }
}

module.exports = new DiscountService();