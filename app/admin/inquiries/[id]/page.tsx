"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "pending" | "completed";
  reply?: string;
}

export default function InquiryReply({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchInquiry();
  }, []);

  const fetchInquiry = async () => {
    try {
      const res = await fetch(`/api/inquiries/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setInquiry(data);
        if (data.reply) {
          setReply(data.reply);
        }
      } else {
        alert("문의 내용을 불러오는데 실패했습니다.");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("문의 내용을 불러오는 중 오류가 발생했습니다.");
      router.push("/admin/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/inquiries/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply, status: "completed" }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        alert("답변 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("답변 등록 중 오류가 발생했습니다.");
    }
  };

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold mb-4">문의 내용</h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">이름</p>
                    <p className="text-base">{inquiry.name}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">이메일</p>
                    <p className="text-base">{inquiry.email}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">연락처</p>
                    <p className="text-base">{inquiry.phone}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">문의 내용</p>
                    <p className="text-base whitespace-pre-wrap">
                      {inquiry.message}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">문의 일시</p>
                    <p className="text-base">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label className="leading-loose">답변</label>
                    <textarea
                      required
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      rows={5}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    >
                      답변 등록
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
