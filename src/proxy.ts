import { NextRequest, NextResponse } from "next/server";
import { validateAccessToken } from "./modules/auth/auth.util";

export function handlePageRouting(request:NextRequest):NextResponse|null {
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

export async function handleApiProtection(request:NextRequest):Promise<NextResponse|null> {
    const { pathname } = request.nextUrl;

    const isTaskRoute = pathname === '/api/task' || pathname.startsWith('/api/task/');

    if (isTaskRoute) {
        const authHeader = request.headers.get('authorization');
        
       
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: Missing Token"
            }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        try {
            
            const payload =  validateAccessToken(token);

            if(!payload.valid){
                return NextResponse.json({
                    success:false,
                    error:"Unauthorized",
                    code:"TOKEN_EXPIRED",
                    expiredAt:payload.expiredAt
                },{status:401});
            }
            const requestHeaders = new Headers(request.headers);
           const newPayload = (payload.decoded as  {sub:string}).sub;
            requestHeaders.set('x-user-id', newPayload); 
            
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (err:unknown) {

            console.error('JWT Verification failed:', err);
            return NextResponse.json({
                success: false,
                error: "Unauthorized access token"
            }, { status: 401 });
        }
    }

    return null;
}

export async function proxy(request:NextRequest):Promise<NextResponse> {
    
    const pageResponse = handlePageRouting(request);
    if (pageResponse) return pageResponse;

    
    const apiResponse = await handleApiProtection(request);
    if (apiResponse) return apiResponse;

    return NextResponse.next();
}

export const config = {
    matcher: ['/','/login','/api/task','/api/task/:path*']
}
