"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export default function NoticeDetailPage() {
  const params = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(`/api/notices/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setNotice(data);
        }
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchNotice();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center">로딩 중...</p>
        </div>
      </Layout>
    );
  }

  if (!notice) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center">공지사항을 찾을 수 없습니다.</p>
          <div className="text-center mt-4">
            <Link href="/notice" className="text-blue-500 hover:text-blue-600">
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-3xl font-bold">{notice.title}</h1>
            <div className="flex gap-4 mt-2 text-gray-500">
              <span>
                작성일: {new Date(notice.createdAt).toLocaleDateString()}
              </span>
              {notice.updatedAt && (
                <span>
                  수정일: {new Date(notice.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />
          <div className="mt-8 text-center">
            <Link href="/notice" className="text-blue-500 hover:text-blue-600">
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
