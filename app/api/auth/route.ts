import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { username, role: "admin" },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "1d" }
      );

      // Set HTTP-only cookie
      cookies().set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "잘못된 인증 정보입니다." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const token = cookies().get("auth-token");

  if (!token) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET || "fallback-secret");
    return NextResponse.json({ isAuthenticated: true });
  } catch {
    return NextResponse.json({ isAuthenticated: false });
  }
}
