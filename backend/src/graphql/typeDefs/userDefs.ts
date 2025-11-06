export const userDefs = `#graphql

type Response {
    message: String!
    success: Boolean!
    user: Users
    users: [Users]
}

type Users {
    name: String,
    username: String,
    password: String
}

input UserSignUp {
    name: String!,
    username: String!,
    password: String!
}

input UserSignIn {
    username: String!,
    password: String!
}

type Query {
    getAllUsers: Response
}

type Mutation {
    SignUpUser(data: UserSignUp!): Response,
    SignInUser(data: UserSignIn!): Response
}

`