import { ApolloServer, type BaseContext } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { resolvers, typeDefs } from "./graphql/index.js";

const app = express()

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

await server.start()

app.use('/graphql',
    cors(),
    express.json(),
    cookieParser(),
    expressMiddleware(server,{
        context: async({req,res})=>{
            return {req,res}
        }
    })
)

app.listen(process.env.PORT,()=>console.log("Server Started"))