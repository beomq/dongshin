import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    await cookieStore.delete("auth-token");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "로그아웃 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
