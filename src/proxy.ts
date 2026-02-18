import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function proxy(req:NextRequest){
    const {pathname} = req.nextUrl;
    const publicPaths = ["/api/auth", "/login", "/register","/favicon.ico","/_next"]

    
    if (publicPaths.some(path => pathname.startsWith(path))) {
       return NextResponse.next()
    }
    const tokenAvailable = await getToken({req, secret:process.env.NEXT_AUTH_SECRET})
    if (!tokenAvailable) {
        const loginUrl = new URL('/login',req.url)
        loginUrl.searchParams.set('callbackUrl',req.url)
        return NextResponse.redirect(loginUrl);

        
        
    }
    return NextResponse.next();


}
export const config = {
    matcher:
    [
    
    '/((?!api|_next/static|_next/image|node_modules|.*\\.png$).*)',
  ],
}