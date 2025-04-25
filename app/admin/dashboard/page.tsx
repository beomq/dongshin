"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChartBarIcon,
  DocumentTextIcon,
  InboxIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface PageView {
  path: string;
  views: number;
  lastVisited: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchAnalytics();
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

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics");
      if (response.ok) {
        const data = await response.json();
        setPageViews(data);
      }
    } catch (error) {
      console.error("통계 데이터를 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };

  const menuItems = [
    {
      title: "제품 관리",
      description: "제품 정보 추가, 수정 및 삭제",
      href: "/admin/products",
      icon: CubeIcon,
    },
    {
      title: "공지사항 관리",
      description: "공지사항 작성, 수정 및 삭제",
      href: "/admin/notices",
      icon: DocumentTextIcon,
    },
    {
      title: "문의 관리",
      description: "고객 문의 확인 및 답변",
      href: "/admin/inquiries",
      icon: InboxIcon,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">관리자 대시보드</h1>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          로그아웃
        </button>
      </div>

      {/* 페이지 접속 통계 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <ChartBarIcon className="w-5 h-5 mr-2" />
          페이지별 접속 현황
        </h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">로딩 중...</div>
          ) : pageViews.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              아직 기록된 통계가 없습니다.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    페이지
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    접속수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    최근 접속
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageViews.map((page) => (
                  <tr key={page.path}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {page.path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(page.lastVisited).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 관리 메뉴 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <item.icon className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
