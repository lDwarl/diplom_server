const DiscountService = require('../services/discountService');

class DiscountController {
    async updateDiscount(req, res, next) {
        try {
            const orgId = req.params.orgId;
            const user = req.user;
            const {percent} = req.body;
            const updatedOrg = await DiscountService.updateDiscountPercent(user.organizationId, orgId, percent);
            res.status(200).json(updatedOrg);
        } catch (e) {
            next(e);
        }
    }

    async removeDiscount(req, res, next) {
        try {
            const orgId = req.params.orgId;
            const user = req.user;
            const updatedOrg = await DiscountService.removeDiscount(user.organizationId, orgId);
            res.status(200).json(updatedOrg);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DiscountController();