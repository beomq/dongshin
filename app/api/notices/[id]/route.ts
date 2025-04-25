import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data/notices.json");

async function readNotices(): Promise<Notice[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeNotices(notices: Notice[]) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(notices, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const notices = await readNotices();
    const notice = notices.find((n) => n.id === params.id);

    if (!notice) {
      return NextResponse.json(
        { message: "공지사항을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(notice);
  } catch (error) {
    console.error("Error reading notice:", error);
    return NextResponse.json(
      { message: "공지사항을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "제목과 내용은 필수 입력사항입니다." },
        { status: 400 }
      );
    }

    const notices = await readNotices();
    const noticeIndex = notices.findIndex((n) => n.id === params.id);

    if (noticeIndex === -1) {
      return NextResponse.json(
        { message: "공지사항을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const updatedNotice = {
      ...notices[noticeIndex],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    notices[noticeIndex] = updatedNotice;
    await writeNotices(notices);

    return NextResponse.json(updatedNotice);
  } catch (error) {
    console.error("Error updating notice:", error);
    return NextResponse.json(
      { message: "공지사항 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const notices = await readNotices();
    const noticeIndex = notices.findIndex((n) => n.id === params.id);

    if (noticeIndex === -1) {
      return NextResponse.json(
        { message: "공지사항을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    notices.splice(noticeIndex, 1);
    await writeNotices(notices);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting notice:", error);
    return NextResponse.json(
      { message: "공지사항 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
