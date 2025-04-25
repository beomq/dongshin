"use client";

import Layout from "../../components/layout/Layout";

export default function GreetingPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              인사말
            </h1>
            <p className="text-lg text-gray-500">
              고객과 함께 성장하는 동신프라스틱
            </p>
          </div>

          <div className="prose prose-lg mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <p className="text-gray-600 mb-4">
                안녕하십니까,
                <br />
                동신프라스틱 대표이사 박일우입니다.
              </p>
              <p className="text-gray-600 mb-4">
                저희 동신프라스틱은 1990년 설립 이래로 30여 년간 엔지니어링
                플라스틱 분야에서 고객사의 신뢰를 바탕으로 지속적인 성장을
                이어오고 있습니다.
              </p>
              <p className="text-gray-600 mb-4">
                급변하는 산업 환경 속에서도 고객의 요구에 부응하는 최적의
                솔루션을 제공하기 위해 끊임없는 연구와 혁신을 추구하고 있으며,
                글로벌 시장 진출을 통해 새로운 도약을 준비하고 있습니다.
              </p>
              <p className="text-gray-600 mb-4">
                앞으로도 동신프라스틱은 고객 만족을 최우선 가치로 삼고, 신뢰받는
                기업으로 성장해 나갈 것을 약속드립니다.
              </p>
              <p className="text-gray-600 mb-4">
                고객 여러분의 변함없는 관심과 성원을 부탁드립니다.
              </p>
              <p className="text-gray-600 text-right mt-8">
                동신프라스틱 대표이사 박일우
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  비전
                </h3>
                <p className="text-gray-600">
                  글로벌 시장을 선도하는 엔지니어링 플라스틱 전문기업
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  미션
                </h3>
                <p className="text-gray-600">
                  최고의 품질과 서비스로 고객 가치 창출에 기여
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  핵심가치
                </h3>
                <p className="text-gray-600">신뢰, 혁신, 전문성, 고객중심</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
