import { userResolvers } from "./resolvers/userResolver.js";
import { userDefs } from "./typeDefs/userDefs.js";

export const typeDefs = [userDefs]
export const resolvers = [userResolvers]