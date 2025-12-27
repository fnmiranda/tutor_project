import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
]

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  const pash = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path = pash)
  const authToken = request.cookies.get('token')

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const rediretRoute = request.nextUrl.clone()

    rediretRoute.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(rediretRoute)
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const rediretRoute = request.nextUrl.clone()

    rediretRoute.pathname = '/'
    return NextResponse.redirect(rediretRoute)
  }

  if (authToken && !publicRoute) {
    return NextResponse.next()
  }

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
