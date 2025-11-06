import { PrismaClient } from "./generated/client/client.js";
import bcrypt from 'bcrypt'
import 'dotenv/config'
export const prisma = new PrismaClient().$extends({
    query: {
        user: {
            async create({args,query}){
                if(args.data.password){
                    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
                    args.data.password = await bcrypt.hash(args.data.password,salt)
                }

                return query(args)
            }
        }
    }
})
