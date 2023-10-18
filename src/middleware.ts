import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(req: NextRequest) {
    const validRoles = ['admin', 'super-user']

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if( req.nextUrl.pathname.startsWith('/api/admin') ){
        if( !session ){
            return new Response( JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
                headers: {
                    'Content-Type':'application/json'
                }
            } )
        }

        if( !validRoles.includes( session.user.role ) ){
            return new Response( JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
                headers: {
                    'Content-Type':'application/json'
                }
            } )
        }
    }

    if (!session) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = '/auth/login';
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
    }

    if( req.nextUrl.pathname.startsWith('/admin') ){
        if( !validRoles.includes( session.user.role ) ){
            const url = req.nextUrl.clone();
            url.pathname = ''
            return NextResponse.redirect(url);
        }
    }

    if( req.nextUrl.pathname.startsWith('/checkout/summary') ){
        if( !req.cookies.get('cart') ){
            const url = req.nextUrl.clone();
            url.pathname = '/cart/empty';
            return NextResponse.redirect(url);
        }
    }

    if( req.nextUrl.pathname.startsWith('/checkout/summary') ){
        if( !req.cookies.get('address') ){
            const url = req.nextUrl.clone();
            url.pathname = '/checkout/address';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/checkout/:path*", "/orders/:path*", "/admin/:path*", "/api/admin/:path*"]
};