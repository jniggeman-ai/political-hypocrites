import { NextResponse } from 'next/server';

const PASSWORD = 'Emily011101'; // 👈 Change this to whatever you want

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow the login page and its POST action through
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Check for the auth cookie
  const auth = request.cookies.get('ph_auth');
  if (auth && auth.value === PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/login';
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
