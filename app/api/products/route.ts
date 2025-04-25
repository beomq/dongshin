import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Product {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  applications: string[];
  properties: string[];
  createdAt: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data/products.json");

async function ensureDirectoryExists() {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
}

async function readProducts(): Promise<Product[]> {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeProducts(products: Product[]) {
  await ensureDirectoryExists();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(products, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, manufacturer, applications, properties } = body;

    if (
      !name ||
      !description ||
      !manufacturer ||
      !applications ||
      !properties
    ) {
      return NextResponse.json(
        { message: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const products = await readProducts();
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description,
      manufacturer,
      applications,
      properties,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    await writeProducts(products);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "제품 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json(
      { message: "제품 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
