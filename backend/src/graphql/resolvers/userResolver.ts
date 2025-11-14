import { prisma } from "../../prisma/client.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import type { Response } from "express"
import { CookieOptions } from "../../utils/utils.js"
import type { Link } from "../../prisma/generated/client/index.js"
import { nanoid } from "nanoid"
export const userResolvers = {
    Query: {
        getUser: async(_:any,__:any,{payload}:{payload:any})=>{
        try{
            
            const {userId} = payload
            if(!userId) throw new Error("Authentication Error")
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(userId)
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
        },
        getContents: async(_:any,__:any,{payload}:{payload: any})=>{
            if(!payload) return {
                message:"Authorization Error",
                success: false
            }
            try{
                const contents = await prisma.content.findMany({
                where: {
                    userId: Number(payload.userId)
                }
            })
            return {
                message: "Contents fetched",
                success: true,
                contents
            }  
            } catch(e){
                console.error(e)
                throw new Error("DB Error")
            } 
        },
        getAllUsers: async(_:any,__:any,{payload}:{payload: any})=>{
            if(!payload) return {
                message: "Invalid User",
                success: false
            }
            const users = await prisma.user.findMany({
                select:{
                    id: true,
                    name: true,
                    email: true,
                    sharableLink: false,
                    password: false
                }
            })
            return {
                message: "fetched all users",
                success: true,
                users
            }
        },
        getContentsByLink: async(_:any,args: {link: string},{payload}: {payload:any})=>{
            if(!payload) return {
                message:"Unauthorized user",
                success: false
            }
            const link = args.link
           try{
            // find that user using link
             const user = await prisma.user.findUnique({
                where: {
                    sharableLink: link
                }
            })
            const contents = await prisma.content.findMany({
                where:{
                    userId: Number(user?.id)
                }
            })
            return {
                message: "Successfully fetched data",
                success: true,
                contents     
            }
           }catch(e){
            console.error(e)
            throw new Error("DB Error")
           }
        },
        getSharableLink: async(_:any,__:any,{payload}:{payload : any}) => {
            if(!payload) return {
                message: "Unauthorized User",
                success: false
            }
            try{
                const user = await prisma.user.findUnique({
                where: {
                    id: Number(payload.userId)
                }
            })
            return {
                message: "Successfully fetched link",
                success: true,
                link: user?.sharableLink 
            }
            }catch(e){
                console.error(e)
                throw new Error("DB Error")
            }
        }
    },
    Mutation: {
        signupUser: async(_:any,args: {data: {name: string, email: string, password: string}},{res}:{res: Response}) => {
            const {email, name, password} = args.data
            const link = nanoid()
            try{
                const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                    sharableLink: link
                }
            })
            if(user){
                const token = jwt.sign({userId: user.id},process.env.JWT_SECRET as string,{expiresIn: '1d'})
                res.cookie(process.env.COOKIE_NAME as string,token,CookieOptions)
            return {
                success: true,
                message: "User signed up successfully"
            }
            } 
            }catch(e:any){
                console.error(e)
                if(e.code === 'P2002') {
                 return {
                    message: "User Already Exists",
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
            res.cookie(process.env.COOKIE_NAME as string,token,CookieOptions)  
            return {
                success: true,
                message: "User logged In",
                token: token
            }
        },
        logoutUser: async(_:any,__:any,{payload, res}:{payload : any, res: Response})=>{
           try {
             if(payload){
                res.clearCookie(process.env.COOKIE_NAME as string,CookieOptions)
                return {
                    success: true,
                    message: "LogOut Successful"
                }
            }
            return {
                message: "User isnt logged In",
                success: false
            }
           } catch(e) {
            console.error(e)
            throw new Error("DB Error")
           }
        },
        createContent: async(_:any, args: {data: {title: string, description: string, link: string, tags: string[], type: Link}},{payload}:{payload: any}) => {
            if(!payload) return {
                message: "Invalid User",
                success: false
            }
            const {title,description,link,tags, type} = args.data
            try {
                 const user = await prisma.user.findUnique({
                where: {
                    id: Number(payload.userId)
                }
            })
        
            if(user){
                const content = await prisma.content.create({
                    data: {
                        title,
                        description,
                        link,
                        tags,
                        type,
                        user: {
                            connect: {id: Number(payload.userId)}
                        }
                    }
                })
                return {
                    success: true,
                    message: "Content created successfully",
                    content
                }
            }
            } catch(e){
                console.error(e)
                throw new Error("DB Error")
            }
        },
        updateContent: async(_:any, args: {id: string, data: {title?: string,description?: string,link?: string, tags?: string[], type?: Link}},{payload}:{payload: any})=>{
            if(!payload) return {
                message: "Invalid User",
                success: false
            }
           try{
             const content = await prisma.content.findUnique({
                where: {id: Number(args.id)}
            })
            if(!content || content?.userId !== Number(payload.userId)){
                return {
                    message:"Unauthorized User",
                    success: false
                }
            }
            const {title,description,link,type,tags} = args.data

            // check undefined values 
            const data: any = {
                ...(title && {title}),
                ...(description && {description}),
                ...(link && {link}),
                ...(tags && {tags: {set: tags}}),
                ...(type && {type: {set: type}}),
            }
            const updatedContent = await prisma.content.update({
                where: {
                    id: content.id
                },
                data
            })
            return {
                message:"Content successfully updated",
                success: true,
                content: updatedContent
            }
           }catch(e){
            console.error(e)
            throw new Error("DB Error")
        }
        },
        deleteContent: async(_:any,args:{id: string},{payload}:{payload: any}) =>{
            if(!payload) return {
                message: "Unauthrozied user",
                success: false
            }
            const {id} = args
            
            try{
                // search content id 
            const content = await prisma.content.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if(!content?.userId || content?.userId != payload.userId) return {
                message: "Invalid user trying to delete",
                success: false
            }
                const deleteContent = await prisma.content.delete({
                where: {
                    id: Number(id)
                }
            })
            return {
                message: "Successfully deleted content",
                success: true
            }
            }catch(e){
                console.error(e)
                throw new Error("DB Error")
            }
        }      
    }
}