import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data/notices.json");

async function ensureDirectoryExists() {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
}

async function readNotices(): Promise<Notice[]> {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeNotices(notices: Notice[]) {
  await ensureDirectoryExists();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(notices, null, 2));
}

export async function GET() {
  try {
    const notices = await readNotices();
    return NextResponse.json(notices);
  } catch (error) {
    console.error("Error reading notices:", error);
    return NextResponse.json(
      { message: "공지사항을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "제목과 내용은 필수 입력사항입니다." },
        { status: 400 }
      );
    }

    const notices = await readNotices();
    const newNotice: Notice = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    notices.push(newNotice);
    await writeNotices(notices);

    return NextResponse.json(newNotice);
  } catch (error) {
    console.error("Error creating notice:", error);
    return NextResponse.json(
      { message: "공지사항 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
