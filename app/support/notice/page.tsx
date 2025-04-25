"use client";

import Layout from "../../components/layout/Layout";

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

const notices: Notice[] = [
  {
    id: 1,
    title: "2024년 설 연휴 휴무 안내",
    date: "2024-02-05",
    content:
      "2024년 설 연휴 기간(2024.02.09 ~ 2024.02.13) 동안 휴무입니다. 긴급한 문의사항은 이메일로 연락 부탁드립니다.",
  },
  {
    id: 2,
    title: "신규 제품 런칭 안내",
    date: "2024-01-15",
    content:
      "쎌라니즈코리아의 신규 제품 POM M90이 런칭되었습니다. 자세한 내용은 제품 페이지를 참고해 주시기 바랍니다.",
  },
  {
    id: 3,
    title: "홈페이지 리뉴얼 안내",
    date: "2024-01-02",
    content:
      "동신프라스틱 홈페이지가 새롭게 리뉴얼되었습니다. 보다 나은 서비스로 찾아뵙겠습니다.",
  },
];

export default function NoticePage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              공지사항
            </h1>
            <p className="text-lg text-gray-500">
              동신프라스틱의 새로운 소식을 알려드립니다
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {notice.title}
                  </h2>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
                <p className="text-gray-600 whitespace-pre-line">
                  {notice.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              문의하기
            </h2>
            <p className="text-gray-600">
              기타 문의사항은 아래 연락처로 문의해 주시기 바랍니다.
            </p>
            <div className="mt-4">
              <p className="text-gray-600">
                <span className="font-medium">전화:</span> 02-2676-0626
              </p>
              <p className="text-gray-600">
                <span className="font-medium">이메일:</span> Resins4228@daum.net
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
