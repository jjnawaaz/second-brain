import { prisma } from "../../prisma/client.js"
import bcrypt from 'bcrypt'
import 'dotenv/config'
export const userResolvers = {
    Query: {

    },
    Mutation: {
        SignUpUser: async(_:any,args: {data: {name: string, username: string, password: string}}) => {
            const {username, name, password} = args.data
            try{
                const user = await prisma.user.create({
                data: {
                    name: name,
                    username: username,
                    password: password
                }
            })
               return {
                success: true,
                message: "User signed up successfully",
                user
            }
            }catch(e:any){
                throw new Error(e)
            }    
        },
        SignInUser: async(_:any,args: {data:{username:string,password:string}})=>{
            const {username, password} = args.data
            
            const user = await prisma.user.findUnique({
                where:{
                    username: username
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
            return {
                success: true,
                message: "User logged In"
            }
        }
    }
}