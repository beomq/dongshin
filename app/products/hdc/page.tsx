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
    id: "ep-153",
    name: "EP-153",
    description: "고충격 ABS 수지",
    applications: ["자동차 내외장재", "가전제품 하우징", "완구류", "생활용품"],
    properties: [
      "우수한 충격강도",
      "뛰어난 성형성",
      "우수한 표면 광택",
      "양호한 내화학성",
    ],
  },
  {
    id: "ep-440",
    name: "EP-440",
    description: "범용 폴리프로필렌 수지",
    applications: ["자동차 부품", "가전제품", "산업용 부품", "포장용기"],
    properties: ["우수한 강성", "양호한 내열성", "우수한 성형성", "경제성"],
  },
];

export default function HdcPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              HDC현대EP 제품
            </h1>
            <p className="text-lg text-gray-500">
              고품질 엔지니어링 플라스틱 제품 라인업
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
