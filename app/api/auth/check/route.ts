import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = await cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    jwt.verify(token.value, JWT_SECRET);
    return NextResponse.json({ isAuthenticated: true });
  } catch {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
