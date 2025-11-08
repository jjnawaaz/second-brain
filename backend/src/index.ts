import { ApolloServer, type BaseContext } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { resolvers, typeDefs } from "./graphql/index.js";
import { authMiddleware } from "./utils/authMiddleware.js";

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
        context: async({req,res}:{req: Request, res: Response})=>{
            const payload = authMiddleware(req)
            return {req,res,payload}
        }
    })
)

app.listen(process.env.PORT,()=>console.log("Server Started"))