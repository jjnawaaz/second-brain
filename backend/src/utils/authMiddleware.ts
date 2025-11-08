import 'dotenv/config'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: any)=>{
    const token = req.cookies[process.env.COOKIE_NAME as string]
    if(token){
        const userId = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
        return userId
    }
    return null
}