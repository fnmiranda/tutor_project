import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = []

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
