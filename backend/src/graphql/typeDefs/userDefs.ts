export const userDefs = `#graphql

enum ContentType {
    DOCUMENT
    TWEET
    YOUTUBE
    LINKEDIN
}


type User {
    id: ID!
    name: String!
    email: String!
    sharableLink: String
}


input SignUpInput {
    name: String!
    email: String!
    password: String!
}

input SignInInput {
    email: String!
    password: String!
}

type SignInResponse{
    message: String!
    success: Boolean!
    token: String  
}

type UserResponse {
    message: String!
    success: Boolean!
    user: User
}

type UsersResponse {
    message: String!
    success: Boolean!
    users: [User!]
}


type ContentPayload {
    id: ID!
    title: String!
    description: String!
    link: String!
    type: String!
    tags: [String!]
    userId: ID!
    createdAt: String
    updatedAt: String
}

type ContentResponse {
    success: Boolean!
    message: String!
    content: ContentPayload
}

type ContentsResponse {
    message: String!
    success: Boolean!
    contents: [ContentPayload!]
}

type DeleteContentResponse {
    message: String!
    success: Boolean!
}

type GetSharableLinkResponse {
    link: String
    success: Boolean!
    message: String!
}

input CreateContentInput {
    title: String!
    description: String!
    link: String!
    type: ContentType = LINKEDIN
    tags: [String!]
}

input UpdateContentInput {
    title: String
    description: String
    link: String
    type: ContentType
    tags: [String!]
}



#Queries and Mutations 

type Query {
    getContents: ContentsResponse
    getUser: UserResponse
    getAllUsers: UsersResponse
    getContentsByLink(link: String!): ContentsResponse
    getSharableLink: GetSharableLinkResponse
}

type Mutation {
    signupUser(data: SignUpInput!) : SignInResponse
    signinUser(data:SignInInput!) : SignInResponse
    createContent(data: CreateContentInput!): ContentResponse
    updateContent(id: ID!, data: UpdateContentInput!): ContentResponse
    deleteContent(id: ID!): DeleteContentResponse
    logoutUser: SignInResponse
}

`