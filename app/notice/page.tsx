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

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/notices");
      if (!response.ok) {
        throw new Error("공지사항을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setNotices(data);
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
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-red-500 text-center">{error}</p>
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
            <h1 className="text-2xl font-bold mb-6">공지사항</h1>
            {notices.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                등록된 공지사항이 없습니다.
              </p>
            ) : (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <Link
                    href={`/notice/${notice.id}`}
                    key={notice.id}
                    className="block"
                  >
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h2 className="text-lg font-semibold mb-2">
                        {notice.title}
                      </h2>
                      <div className="text-sm text-gray-500">
                        <span>
                          작성일:{" "}
                          {format(new Date(notice.createdAt), "yyyy.MM.dd")}
                        </span>
                        {notice.updatedAt && (
                          <span className="ml-4">
                            수정일:{" "}
                            {format(new Date(notice.updatedAt), "yyyy.MM.dd")}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
