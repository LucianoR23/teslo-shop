// import { NextResponse } from 'next/server'
// import type { NextFetchEvent, NextRequest } from 'next/server'
// import { jwt } from './utils'

// export async function middleware( req: NextRequest, ev: NextFetchEvent ) {
//     const {cookies} = req
//     const token = cookies.get('token')?.value
//     console.log(token)
    
//     try {

//         await jwt.isValidToken( token! )
//         return NextResponse.next()

//     } catch (error) {
//         const url = req.nextUrl.clone()
//         const previousPage = req.nextUrl.pathname
//         url.pathname = '/auth/login'
//         return NextResponse.redirect(`${url}?p=${ previousPage }`)
//     }
// }

// export const config = {
//     matcher: '/checkout/:path*',
// }

import { NextResponse, type NextRequest } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const previousPage = req.nextUrl.pathname;
    
    if (previousPage.startsWith("/checkout")) {
        const token = req.cookies.get("token")?.value;
        if (!token) {
        return NextResponse.redirect(
            new URL(`/auth/login?p=${previousPage}`, req.url)
        )}
        try {
            await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET_SEED)
            );
            return NextResponse.next();
        } catch (error) {
        return NextResponse.redirect(
            new URL(`/auth/login?p=${previousPage}`, req.url)
        );
        }
    }
    }

export const config = {
    matcher: ["/checkout/:path*"],
};