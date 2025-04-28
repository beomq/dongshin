"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export default function NoticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotice();
  }, [params.id]);

  const fetchNotice = async () => {
    try {
      const response = await fetch(`/api/notices/${params.id}`);
      if (!response.ok) {
        throw new Error("공지사항을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setNotice(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-red-500 text-center">
              {error || "공지사항을 찾을 수 없습니다."}
            </p>
            <div className="mt-4 text-center">
              <Link href="/notice" className="text-blue-500 hover:underline">
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{notice.title}</h1>
            <div className="flex gap-4 text-sm text-gray-500 mb-6">
              <span>
                작성일: {format(new Date(notice.createdAt), "yyyy.MM.dd")}
              </span>
              {notice.updatedAt && (
                <span>
                  수정일: {format(new Date(notice.updatedAt), "yyyy.MM.dd")}
                </span>
              )}
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
            <div className="mt-8 border-t pt-4">
              <Link href="/notice" className="text-blue-500 hover:underline">
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
