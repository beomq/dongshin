import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("제품 데이터를 불러오는 중 오류가 발생했습니다:", error);
    return NextResponse.json(
      { message: "제품 데이터를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, category, description, features, applications } =
      await request.json();

    if (!name || !category || !description) {
      return NextResponse.json(
        { message: "필수 입력 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    const products = await readProducts();
    const newProduct: Product = {
      id: uuidv4(),
      name,
      category,
      description,
      features: features.filter(Boolean),
      applications: applications.filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);
    await writeProducts(products);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("제품 등록 중 오류가 발생했습니다:", error);
    return NextResponse.json(
      { message: "제품 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, category, description, features, applications } =
      await request.json();

    if (!id || !name || !category || !description) {
      return NextResponse.json(
        { message: "필수 입력 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    const products = await readProducts();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json(
        { message: "제품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const updatedProduct: Product = {
      ...products[productIndex],
      name,
      category,
      description,
      features: features.filter(Boolean),
      applications: applications.filter(Boolean),
      updatedAt: new Date().toISOString(),
    };

    products[productIndex] = updatedProduct;
    await writeProducts(products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("제품 수정 중 오류가 발생했습니다:", error);
    return NextResponse.json(
      { message: "제품 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "제품 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const products = await readProducts();
    const filteredProducts = products.filter((p) => p.id !== id);

    if (products.length === filteredProducts.length) {
      return NextResponse.json(
        { message: "제품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    await writeProducts(filteredProducts);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("제품 삭제 중 오류가 발생했습니다:", error);
    return NextResponse.json(
      { message: "제품 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
