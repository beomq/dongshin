"use client";

import Layout from "../../components/layout/Layout";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  description: string;
  applications: string[];
  properties: string[];
}

const products: Product[] = [
  {
    id: "pa6-b3wg6",
    name: "PA6 B3WG6",
    manufacturer: "BASF",
    description: "유리섬유 30% 강화 폴리아미드6 수지",
    applications: ["자동차 부품", "전기/전자 부품", "기계 부품", "산업용 부품"],
    properties: [
      "우수한 기계적 강도",
      "높은 내열성",
      "양호한 치수 안정성",
      "우수한 내마모성",
    ],
  },
  {
    id: "pom-m90",
    name: "POM M90",
    manufacturer: "Mitsubishi",
    description: "고강성 폴리아세탈 수지",
    applications: ["자동차 기어", "전자제품 부품", "정밀 기계 부품", "스프링"],
    properties: [
      "우수한 기계적 강도",
      "높은 탄성 회복력",
      "우수한 내피로성",
      "양호한 내약품성",
    ],
  },
];

export default function OtherPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              기타 제조사 제품
            </h1>
            <p className="text-lg text-gray-500">
              다양한 제조사의 고품질 엔지니어링 플라스틱 제품
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {product.manufacturer}
                  </span>
                </div>
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
