import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data/products.json");

async function readProducts() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const products = await readProducts();
    const product = products.find((p) => p.id === params.id);

    if (!product) {
      return NextResponse.json(
        { message: "제품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("제품 데이터를 불러오는 중 오류가 발생했습니다:", error);
    return NextResponse.json(
      { message: "제품 데이터를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
