export const CookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
                maxAge: 24 * 60 * 60 * 1000
} 