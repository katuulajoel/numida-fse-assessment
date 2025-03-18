while trying to run 
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

Tried a schema introspection query to see the available fields:
```graphql
{
  __schema {
    queryType {
      fields {
        name
      }
    }
  }
}
```
And saw that we have `laons` and that `existingLoans` is not A valid fieldname


move ^ from packages so as to local the dependencies

i need a logo with just the bird and not bird and company name for the favicon 