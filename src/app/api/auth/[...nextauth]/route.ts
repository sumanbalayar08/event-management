import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { query } = req;
  if (!query || !query.nextauth) {
    console.error('Query parameters are not defined.');
    return NextResponse.error(); // or handle the error as needed
  }

  const result = await NextAuth(req, { authOptions });
  return result;
}
