import { NextResponse } from "next/server";
import { validateAccessToken } from "./modules/auth/auth.util";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function handlePageRouting(request) {
    const { pathname } = request.nextUrl;
    const isLoginPage = pathname === '/login';
    const isRootPage = pathname === '/';

    
    if (isRootPage || isLoginPage) {
        const token = request.cookies.get('refreshToken')?.value;

        if (token && isLoginPage) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (!token && !isLoginPage) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        
        return NextResponse.next();
    }
    
    
    return null; 
}

export async function handleApiProtection(request) {
    const { pathname } = request.nextUrl;

    
    if (pathname.startsWith('/api/task/addtask')) {
        const authHeader = request.headers.get('authorization');
        
       
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: Missing Token"
            }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        try {
            
            const payload = await validateAccessToken(token, JWT_SECRET);
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user-id', payload.sub); 
            
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (err) {
            console.error('JWT Verification failed:', err);
            return NextResponse.json({
                success: false,
                error: "Unauthorized access token"
            }, { status: 401 });
        }
    }

    return null;
}

export async function proxy(request) {
    
    const pageResponse = handlePageRouting(request);
    if (pageResponse) return pageResponse;

    
    const apiResponse = await handleApiProtection(request);
    if (apiResponse) return apiResponse;

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/api/task/addtask']
}