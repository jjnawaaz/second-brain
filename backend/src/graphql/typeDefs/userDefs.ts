export const userDefs = `#graphql

type Response {
    message: String!
    success: Boolean!
    user: Users
    users: [Users]
}

type GetUser {
    message: String
    success: Boolean
    user: Users
}
type GetUsers {
    message: String
    success: Boolean
    user: [Users]
}

type Users {
    name: String,
    username: String
}

input UserSignUp {
    name: String!
    username: String!
    password: String!
}

input UserSignIn {
    username: String!
    password: String!
}

type Query {
    getAllUsers: GetUsers
    getUser(id: String!): GetUser
}

type Mutation {
    SignUpUser(data: UserSignUp!): Response
    SignInUser(data: UserSignIn!): Response
}

`