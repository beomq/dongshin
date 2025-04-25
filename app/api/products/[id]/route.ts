import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  applications: string[];
  createdAt: string;
  updatedAt: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data/products.json");

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const products = await readProducts();
    const product = products.find((p: Product) => p.id === params.id);

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
