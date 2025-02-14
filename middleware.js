import { NextResponse } from 'next/server';

export function middleware(req) {
  const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");
  const origin = req.headers.get('origin');

  const res = NextResponse.next();

  if (allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  }

  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-type, Authorization, Cookie');
  res.headers.set('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: '/api/:path*', // Apply to all API routes
};
