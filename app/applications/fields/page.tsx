"use client";

import Layout from "../../components/layout/Layout";

interface ApplicationField {
  id: string;
  title: string;
  description: string;
  applications: string[];
  materials: string[];
}

const fields: ApplicationField[] = [
  {
    id: "automotive",
    title: "자동차 부품",
    description: "자동차의 다양한 부품에 적용되는 엔지니어링 플라스틱",
    applications: [
      "엔진 부품",
      "내외장재",
      "전장부품",
      "연료계통 부품",
      "냉각계통 부품",
    ],
    materials: [
      "PA66, PA6 (폴리아미드)",
      "PBT (폴리부틸렌테레프탈레이트)",
      "POM (폴리아세탈)",
      "PC (폴리카보네이트)",
      "PP (폴리프로필렌)",
    ],
  },
  {
    id: "electronics",
    title: "전기/전자",
    description:
      "전기/전자 제품의 부품 및 하우징에 사용되는 엔지니어링 플라스틱",
    applications: [
      "커넥터",
      "스위치",
      "LED 하우징",
      "배터리 케이스",
      "전자기기 외장",
    ],
    materials: [
      "PBT (폴리부틸렌테레프탈레이트)",
      "PC (폴리카보네이트)",
      "ABS (아크릴로니트릴 부타디엔 스티렌)",
      "PPS (폴리페닐렌설파이드)",
    ],
  },
  {
    id: "industrial",
    title: "산업용 부품",
    description: "다양한 산업 분야에서 사용되는 고성능 엔지니어링 플라스틱",
    applications: ["기계 부품", "베어링", "기어", "펌프 부품", "컨베이어 부품"],
    materials: [
      "POM (폴리아세탈)",
      "PA66, PA6 (폴리아미드)",
      "PEEK (폴리에테르에테르케톤)",
      "PPS (폴리페닐렌설파이드)",
    ],
  },
];

export default function ApplicationFieldsPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              적용분야
            </h1>
            <p className="text-lg text-gray-500">
              엔지니어링 플라스틱의 주요 적용분야 및 소재
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {fields.map((field) => (
              <div
                key={field.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {field.title}
                </h2>
                <p className="text-gray-600 mb-6">{field.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      주요 적용 제품
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {field.applications.map((app, index) => (
                        <li key={index}>{app}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      주요 소재
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {field.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              기술 문의
            </h2>
            <p className="text-gray-600">
              적용분야에 대한 자세한 정보나 기술 문의는 아래 연락처로 문의해
              주시기 바랍니다.
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
