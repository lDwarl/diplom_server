const ApiError = require('../exceptions/ApiError');
const EmployeeModel = require('../models/employeeModel');

class EmployeeService {
    async createEmployee(name, organizationId, birthday) {
        return EmployeeModel.create({
            fullName: name,
            organizationId,
            birthday,
        });
    }

    async getEmployees(filters) {
        return EmployeeModel.find({...filters});
    }

    async getEmployeeById(id) {
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            throw ApiError.notFound('Employee not found');
        }
        return employee;
    }

    async updateEmployee(id, updateData) {
        const employeeData = await EmployeeModel.findById(id);
        if (!employeeData) {
            throw ApiError.notFound('Employee not found');
        }

        const employee = await EmployeeModel.findByIdAndUpdate(id, { ...updateData }, {new: true});
        return employee;
    }

    async removeEmployee(id) {
        const employeeData = await EmployeeModel.findById(id);
        if (!employeeData) {
            throw ApiError.notFound('Employee not found');
        }
        await EmployeeModel.findByIdAndDelete(id);
        return id;
    }
}

module.exports = new EmployeeService();