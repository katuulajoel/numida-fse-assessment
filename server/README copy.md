![Numida](./logo.numida.png)

# SERVER SETUP INSTRUCTIONS

This is a python server and requires that you have `python 3.9+` installed on your machine.

## Installation

> You will need docker installed in order to run the server

1. Change directory to the server folder `cd server`
2. Build and run the server `docker compose up --build`
3. Confirm your application is available at http://localhost:2024

## API Documentation

### GraphQL Endpoint

**URL:** `/graphql`

**Method:** `POST`

**Description:** This endpoint allows you to query loan products and loan applications using GraphQL.

**Example Query:**

To get all existing loans:

```graphql
{
  existingLoans {
    id
    name
    interestRate
    principal
    dueDate
  }
}
```

## Defining the `existingLoans` Query

To resolve the error regarding the `existingLoans` query, you need to define it in your GraphQL schema. Follow these steps:

1. Open the GraphQL schema file (e.g., `schema.graphql` or `schema.js`).
2. Add the `existingLoans` query definition to the schema.
3. Implement the resolver for the `existingLoans` query in your server code.

### Example Schema Definition

```graphql
type Loan {
  id: ID!
  name: String!
  interestRate: Float!
  principal: Float!
  dueDate: String!
}

type Query {
  existingLoans: [Loan]
}
```

### Example Resolver Implementation

```javascript
const resolvers = {
  Query: {
    existingLoans: () => {
      // Fetch and return the list of existing loans from your data source
      return [
        {
          id: "1",
          name: "Loan 1",
          interestRate: 5.0,
          principal: 1000.0,
          dueDate: "2023-12-31"
        },
        // Add more loan objects as needed
      ];
    }
  }
};

module.exports = resolvers;
```

After updating the schema and resolvers, restart your server and try running the query again.

### REST Endpoints

### Home Endpoint

**URL:** `/`
**Method:** `GET`

**Description:** This endpoint returns a welcome message.

**Response:**

```json
{
  "message": "Welcome to the Numida API"
}
```
