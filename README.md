# Simple JWT implementation using NodeJS

This is a very simple JWT implementation.

The **server** will provide a login and a protected route.
The **client** will get the JWT through the login route and put the result token
into its authorization header. After this, the **client** will access the protected
route and return the decoded user information, which were stored into the token.

*NOTE:* This is a very simple implementation and should be improved if used in the
production environment but is very good for didactic purposes (to understand how
the JWT approach works).

### Dependencies

- Axios
- ExpressJS
- Nodemon
- Sucrase
- JSON Web Token

### Requirements

- NodeJS
- Yarn or NPM
- Git