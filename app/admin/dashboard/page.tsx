"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth");
        const data = await response.json();

        if (!data.isAuthenticated) {
          router.push("/admin/login");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("인증 확인 중 오류 발생:", error);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">공지사항 관리</h2>
          <button
            onClick={() => router.push("/admin/notice/create")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            새 공지사항 작성
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">제품 관리</h2>
          <button
            onClick={() => router.push("/admin/products/create")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            새 제품 등록
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">제품 문의 관리</h2>
          <button
            onClick={() => router.push("/admin/inquiries")}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            문의 목록 보기
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">로그아웃</h2>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              router.push("/admin/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
