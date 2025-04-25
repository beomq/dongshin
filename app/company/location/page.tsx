"use client";

import Layout from "../../components/layout/Layout";

export default function LocationPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              오시는 길
            </h1>
            <p className="text-lg text-gray-500">동신프라스틱 본사 위치 안내</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">본사</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">주소:</span>
                  <br />
                  서울특별시 영등포구 영등포로 18길 2
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">우편번호:</span> 07291
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">전화:</span> 02-2676-0626
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">팩스:</span> 02-2635-3754
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                교통편 안내
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    지하철
                  </h3>
                  <p className="text-gray-600">
                    1호선 영등포역 하차 후 도보 10분
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    버스
                  </h3>
                  <p className="text-gray-600">
                    영등포시장 정류장 하차
                    <br />
                    간선버스: 160, 260, 360
                    <br />
                    지선버스: 5012, 5615, 5618, 5619
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-600">지도가 들어갈 자리입니다</p>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              * 카카오맵 또는 네이버맵 API를 통해 실제 지도를 표시할 수
              있습니다.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
