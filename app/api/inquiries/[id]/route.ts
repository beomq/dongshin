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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const inquiries = await readInquiries();
    const inquiry = inquiries.find((i) => i.id === params.id);

    if (!inquiry) {
      return NextResponse.json(
        { message: "문의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Error reading inquiry:", error);
    return NextResponse.json(
      { message: "문의 내용을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { reply, status } = body;

    if (!reply) {
      return NextResponse.json(
        { message: "답변 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const inquiries = await readInquiries();
    const inquiryIndex = inquiries.findIndex((i) => i.id === params.id);

    if (inquiryIndex === -1) {
      return NextResponse.json(
        { message: "문의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    inquiries[inquiryIndex] = {
      ...inquiries[inquiryIndex],
      reply,
      status: status || "completed",
    };

    await writeInquiries(inquiries);

    return NextResponse.json(inquiries[inquiryIndex]);
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { message: "답변 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
