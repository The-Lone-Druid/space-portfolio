import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Allow access to auth pages
    if (pathname.startsWith('/auth/')) {
      return NextResponse.next()
    }

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }

      // Only allow ADMIN and EDITOR roles
      if (token.role !== 'ADMIN' && token.role !== 'EDITOR') {
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to public routes
        if (!pathname.startsWith('/admin')) {
          return true
        }

        // Require token for admin routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
}
