import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuth = request.cookies.has('gsf_admin_session')

  // Protect the admin route
  if (pathname.startsWith('/gosafeway-manage')) {
    // If not authenticated and not on the login page, redirect to login
    if (!isAuth && !pathname.endsWith('/login')) {
      return NextResponse.redirect(new URL('/gosafeway-manage/login', request.url))
    }
    
    // If authenticated and on the login page, redirect to dashboard
    if (isAuth && pathname.endsWith('/login')) {
      return NextResponse.redirect(new URL('/gosafeway-manage', request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/gosafeway-manage/:path*'],
}
