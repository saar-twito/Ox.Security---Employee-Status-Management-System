import { Employee } from '../models/employee.js';

export const resolvers = {
  Query: {
    getEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        throw new Error('Failed to fetch employees');
      }
    },
  },
  Mutation: {
    updateEmployeeStatus: async (_, { id, status }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) throw new Error('Employee not found');

        employee.status = status;
        await employee.save();

        return employee;
      } catch (error) {
        throw new Error('Failed to update employee status');
      }
    },
    createEmployee: async (_, { name, status, image }) => {
      try {
        const newEmployee = new Employee({
          name,
          status,
          image,
        });

        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        throw new Error('Failed to create employee');
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) throw new Error('Employee not found');

        return deletedEmployee;
      } catch (error) {
        throw new Error('Failed to delete employee');
      }
    },
  },
};