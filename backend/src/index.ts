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
    resolvers: resolvers,
    introspection: true
})

await server.start()


app.get('/clear-cookies', (req: Request, res: Response) => {
  res.clearCookie(process.env.COOKIE_NAME as string);
  res.json({ message: 'Cookies cleared' });
});

//process.env.FRONTEND_URL || 

app.use('/graphql',
    cors({
        origin: true,
        credentials: true
    }),
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