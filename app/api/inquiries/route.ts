import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "pending" | "completed";
  reply?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data/inquiries.json");

async function ensureDirectoryExists() {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
}

async function readInquiries(): Promise<Inquiry[]> {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeInquiries(inquiries: Inquiry[]) {
  await ensureDirectoryExists();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(inquiries, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, status, createdAt } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const inquiries = await readInquiries();
    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      status: status || "pending",
      createdAt: createdAt || new Date().toISOString(),
    };

    inquiries.push(newInquiry);
    await writeInquiries(inquiries);

    return NextResponse.json(newInquiry);
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { message: "문의 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await readInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error reading inquiries:", error);
    return NextResponse.json(
      { message: "문의 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
