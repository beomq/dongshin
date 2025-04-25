"use client";

import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Link from "next/link";

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        }
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">공지사항</h1>
        <div className="space-y-4">
          {notices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              등록된 공지사항이 없습니다.
            </p>
          ) : (
            notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/notice/${notice.id}`}
                className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{notice.title}</h2>
                  <div className="flex text-sm text-gray-500 gap-4">
                    <span>
                      작성일: {new Date(notice.createdAt).toLocaleDateString()}
                    </span>
                    {notice.updatedAt && (
                      <span>
                        수정일:{" "}
                        {new Date(notice.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
