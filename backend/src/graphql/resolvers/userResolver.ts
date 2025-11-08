import { prisma } from "../../prisma/client.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import type { Response } from "express"
export const userResolvers = {
    Query: {
        getUser: async(_:any, args:{id: string})=>{
            try{
                const {id} = args
            if(!id) throw new Error("Authentication Error")
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if(!user) throw new Error("User not found")
            return {
                message: "User fetched",
                success: true,
                user: {
                    name: user.name,
                    email: user.email
                }
            }
            } catch(e:any) {
                throw new Error(e)
            }
        }
    },
    Mutation: {
        signupUser: async(_:any,args: {data: {name: string, email: string, password: string, sharableLink: string}},{res}:{res: Response}) => {
            const {email, name, password, sharableLink} = args.data
            
            try{
                const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                    sharableLink: sharableLink ? sharableLink : ''
                }
            })
            if(user){
                const token = jwt.sign({userId: user.id},process.env.JWT_SECRET as string,{expiresIn: '1d'})
            res.cookie(process.env.COOKIE_NAME as string,token,{
                httpOnly: true,
                // secure: true 
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return {
                success: true,
                message: "User signed up successfully",
                token: token
            }
            } 
            }catch(e:any){
                
                if(e.code === 'P2002') {
                 return {
                    message: "User already exists",
                    success: false
                }
                }
                throw new Error("DB Error")
                
            }    
        },
        signinUser: async(_:any,args: {data:{email:string,password:string}},{res}:{res: Response})=>{
            const {email, password} = args.data
            
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
            })
            if(!user) return {
                message: "Invalid User",
                success: false
            }
            const validatePassword = await bcrypt.compare(password,user.password)
            console.log(validatePassword)
            if(validatePassword == false) return {
                message: "Invalid Credentials",
                success: false
            }
            // set cookie and token here 
            const token = jwt.sign({userId: user.id},process.env.JWT_SECRET as string,{expiresIn: '1d'})
            console.log(token)
            res.cookie(process.env.COOKIE_NAME as string,token,{
                httpOnly: true,
                // secure: true
                maxAge: 7 * 24 * 60 * 60 * 1000
            })  
            return {
                success: true,
                message: "User logged In",
                token: token
            }
        },
        createContent: async(_:any, args: {data: {title: string, description: string, link: string, tags: [string]}},{payload}:{payload: any}) => {
            console.log(payload.userId)
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(payload.userId)
                }
            })
            if(user){
                // logic to make content
            }else{
                return {
                    message: "Auth Error",
                    success: false
                }
            }
        }
    }
}