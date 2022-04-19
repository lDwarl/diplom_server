const ApiError = require('../exceptions/ApiError');
const OrganizationModel = require('../models/organizationModel');
const EmployeeModel = require('../models/employeeModel');

class OrganizationService {
    async createOrganization(organizationData) {
        const organization = await OrganizationModel.create({
            name: organizationData.name,
            description: organizationData.description,
        });
        return organization;
    }

    async getOrganizations(userOrgId) {
        const organizations = await OrganizationModel.find({'_id': {$ne: userOrgId}});
        if (!organizations) {
            return [];
        }

        const organizationsDataWithEmployee = [];
        for(let org of organizations) {
            const employeesCount = await this.getCountOfEmployees(org._id);
            organizationsDataWithEmployee.push({
               ...org.toObject(),
               employeesCount,
            });
        }

        const myOrg = await this.getOrganizationById(userOrgId);
        const organizationsData = organizationsDataWithEmployee.map((organization => {
            let discount = myOrg.discounts.filter(el => el.id === organization._id.toString())[0];
            if (discount) {
                discount = discount.percent;
            } else {
                discount = null;
            }
            return { ...organization, discountForOrg: discount };
        }));
        return organizationsData;
    }

    async getOrganizationById(id) {
        const organization = await OrganizationModel.findById(id);
        if (!organization) {
            throw ApiError.notFound('Organization not found');
        }
        const employeesCount = await this.getCountOfEmployees(organization._id);
        return {
            ...organization.toObject(),
            employeesCount,
        };
    }

    async getCountOfEmployees(orgId) {
        const employees = await EmployeeModel.find({organizationId: orgId});
        if (!employees) {
            console.log('Get Employees Count Error ===>');
            return 0;
        }
        return employees.length;
    }
}

module.exports = new OrganizationService();