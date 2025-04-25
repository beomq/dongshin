"use client";

import Layout from "../../components/layout/Layout";

interface Product {
  id: string;
  name: string;
  description: string;
  applications: string[];
  properties: string[];
}

const products: Product[] = [
  {
    id: "pps-a130",
    name: "PPS A130",
    description: "고내열성, 고강성 폴리페닐렌설파이드 수지",
    applications: [
      "자동차 부품",
      "전기/전자 부품",
      "산업용 부품",
      "정밀 기계 부품",
    ],
    properties: [
      "우수한 내열성 (최대 200°C)",
      "높은 기계적 강도",
      "뛰어난 치수 안정성",
      "우수한 내화학성",
    ],
  },
  {
    id: "pbt-b4300",
    name: "PBT B4300",
    description: "범용 폴리부틸렌테레프탈레이트 수지",
    applications: [
      "자동차 전장부품",
      "전기/전자 커넥터",
      "소형 기어",
      "하우징",
    ],
    properties: [
      "우수한 전기적 특성",
      "양호한 내화학성",
      "높은 치수 안정성",
      "우수한 성형성",
    ],
  },
];

export default function SamyangPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              삼양사 제품
            </h1>
            <p className="text-lg text-gray-500">
              고성능 엔지니어링 플라스틱 제품 라인업
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      주요 적용분야
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {product.applications.map((app, index) => (
                        <li key={index}>{app}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      제품 특성
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {product.properties.map((prop, index) => (
                        <li key={index}>{prop}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              제품 문의
            </h2>
            <p className="text-gray-600">
              제품에 대한 자세한 정보나 기술 문의는 아래 연락처로 문의해 주시기
              바랍니다.
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
