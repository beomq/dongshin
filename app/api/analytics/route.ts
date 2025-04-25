import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface PageView {
  path: string;
  views: number;
  lastVisited: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data/analytics.json");

async function ensureDirectoryExists() {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
}

async function readAnalytics(): Promise<PageView[]> {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeAnalytics(analytics: PageView[]) {
  await ensureDirectoryExists();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(analytics, null, 2));
}

export async function GET() {
  try {
    const analytics = await readAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error reading analytics:", error);
    return NextResponse.json(
      { message: "통계 데이터를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json(
        { message: "페이지 경로는 필수 입력사항입니다." },
        { status: 400 }
      );
    }

    const analytics = await readAnalytics();
    const existingPage = analytics.find((page) => page.path === path);

    if (existingPage) {
      existingPage.views += 1;
      existingPage.lastVisited = new Date().toISOString();
    } else {
      analytics.push({
        path,
        views: 1,
        lastVisited: new Date().toISOString(),
      });
    }

    await writeAnalytics(analytics);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating analytics:", error);
    return NextResponse.json(
      { message: "통계 데이터 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
