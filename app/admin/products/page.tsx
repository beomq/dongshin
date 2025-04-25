"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  applications: string[];
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check");
      if (!response.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("인증 확인 중 오류가 발생했습니다:", error);
      router.push("/admin/login");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("제품 데이터를 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">제품 관리</h1>
        <Link
          href="/admin/products/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          새 제품 추가
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8">로딩 중...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          등록된 제품이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/products/${product.id}/edit`)
                    }
                    className="text-blue-500 hover:text-blue-600"
                  >
                    수정
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
