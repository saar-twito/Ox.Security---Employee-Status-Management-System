export const typeDefs = `#graphql

  # what data can be returned from the server and how it is structured (schema).
  type Employee {
    id: ID!
    name: String!
    status: Status!
    image: String
  }

 enum Status {
    Working
    OnVacation
    LunchTime
    BusinessTrip
  }

  # which types of queries can be made to the server, and what data can be returned.
  type Query {
    getEmployees: [Employee]
  }

  # which types of mutations can be made to the server, and what data can be returned.
  type Mutation {
    updateEmployeeStatus(id: ID!, status: Status!): Employee
    createEmployee(name: String!, status: Status!, image:String): Employee
    deleteEmployee(id: ID!): Employee
  }
`