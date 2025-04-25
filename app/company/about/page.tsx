"use client";

import Layout from "../../components/layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              회사개요
            </h1>
            <p className="text-lg text-gray-500">
              고품질 엔지니어링 플라스틱 전문기업
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                회사 정보
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">회사명:</span> 동신프라스틱
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">대표이사:</span> 박일우
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">설립일:</span> 1990년
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">사업자등록번호:</span>{" "}
                  107-81-86502
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                연락처
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">주소:</span> 서울특별시 영등포구
                  영등포로 18길 2
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">전화:</span> 02-2676-0626
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">팩스:</span> 02-2635-3754
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">이메일:</span>{" "}
                  Resins4228@daum.net
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              사업 영역
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  엔지니어링 플라스틱
                </h3>
                <p className="text-gray-600">
                  고성능 엔지니어링 플라스틱 제품 판매 및 유통
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  기술 지원
                </h3>
                <p className="text-gray-600">
                  제품 적용을 위한 기술 상담 및 솔루션 제공
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  해외 수출
                </h3>
                <p className="text-gray-600">
                  아시아 지역 중심의 글로벌 비즈니스 전개
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
