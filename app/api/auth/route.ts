import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "dongshin2024!";
const JWT_SECRET = "your-secret-key";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
      const cookieStore = cookies();

      await cookieStore.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1 hour
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { message: "아이디 또는 비밀번호가 잘못되었습니다." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = await cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json({ isAuthenticated: false });
    }

    jwt.verify(token.value, JWT_SECRET);
    return NextResponse.json({ isAuthenticated: true });
  } catch {
    return NextResponse.json({ isAuthenticated: false });
  }
}
