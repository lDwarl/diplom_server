const EmployeeService = require('../services/employeeService');

class EmployeeController {
    async create(req, res, next) {
        try {
            const {name, organizationId, birthday} = req.body;
            const employee = await EmployeeService.createEmployee(name, organizationId, birthday);
            res.status(200).json(employee);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const employees = await EmployeeService.getEmployees();
            res.status(200).json(employees);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            const employee = await EmployeeService.getEmployeeById(id);
            res.status(200).json(employee);
        } catch (e) {
            next(e);
        }
    }

    async getEmployeesForOrganization(req, res, next) {
        try {
            const id = req.params.id;
            const employees = await EmployeeService.getEmployees({organizationId: id});
            res.status(200).json(employees);
        } catch (e) {
            next(e);
        }
    }

    async updateEmployee(req, res, next) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const employee = await EmployeeService.updateEmployee(id, updateData);
            res.status(200).json(employee);
        } catch (e) {
            next(e);
        }
    }

    async removeEmployee(req, res, next) {
        try {
            const id = req.params.id;
            const employeeId = await EmployeeService.removeEmployee(id);
            res.status(200).json({
                success: true,
                removedId: employeeId,
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new EmployeeController();