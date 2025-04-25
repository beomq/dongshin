import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "pending" | "completed";
}

async function ensureDirectoryExists() {
  const dir = path.dirname(INQUIRIES_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readInquiries(): Promise<Inquiry[]> {
  try {
    await ensureDirectoryExists();
    const content = await fs.readFile(INQUIRIES_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeInquiries(inquiries: Inquiry[]) {
  await ensureDirectoryExists();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    const inquiries = await readInquiries();
    const newInquiry: Inquiry = {
      id: Date.now(),
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    inquiries.push(newInquiry);
    await writeInquiries(inquiries);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await readInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
