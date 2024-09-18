import { gql } from '@apollo/client';


// Get all employees
export const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      name
      status
      image
    }
  }
`;

// Create a new employee
export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($name: String!, $status: Status!, $image: String!) {
    createEmployee(name: $name, status: $status, image: $image) {
      id
      name
      status
      image
    }
  }
`;

// Update an employee status
export const CHANGE_EMPLOYEE_STATUS = gql`
  mutation UpdateEmployeeStatus($id: ID!, $status: Status!) {
    updateEmployeeStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;

// Delete an employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
    }
  }
`;
