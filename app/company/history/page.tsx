"use client";

import Layout from "../../components/layout/Layout";

interface HistoryItem {
  year: string;
  events: string[];
}

const historyData: HistoryItem[] = [
  {
    year: "2023.03",
    events: [
      "경기 시흥시 대야동에 DSP-Tech 자가창고 신축 (대지 400평, 800톤 규모)",
    ],
  },
  {
    year: "2022.06",
    events: ["쎌라니즈코리아 대리점 등록 및 판매"],
  },
  {
    year: "2019.02",
    events: ["HDC현대EP 대리점 등록 및 판매"],
  },
  {
    year: "2015.08",
    events: ["해외수출법인 디에스피아이(주) DSPI 설립 "],
  },
  {
    year: "2015.05",
    events: ["해외 Vietnam 지사 설립 (Dongsin Vina)"],
  },
  {
    year: "2009.11",
    events: ["아케마 대리점 등록 및 판매"],
  },
  {
    year: "2006.07",
    events: ["서울 양평동 사욱 및 자가창고 신축 이전 (자가창고 350톤 규모)"],
  },
  {
    year: "2003.02",
    events: ["한화토탈 대리점 등록 및 판매"],
  },
  {
    year: "2002.08",
    events: [
      "Engineering Plastic resin 해외 수출\n- Indonesia, Vietnam, China 等",
    ],
  },
  {
    year: "2002.03",
    events: ["국내 롯데첨단소재 (구 제일모직) 대리점 등록 및 판매 "],
  },
  {
    year: "2000.06",
    events: ["국내 삼양사 대리점 등록 및 판매"],
  },
  {
    year: "2000.03",
    events: ["(주) 동신프라스틱 법인 회사 전환"],
  },
  {
    year: "1991.07",
    events: ["동신수지 개인 기업 설립"],
  },
];

export default function HistoryPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              연혁
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              동신프라스틱의 발자취를 소개합니다.
            </p>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <div className="flow-root">
              <ul className="-mb-8">
                {historyData.map((item, itemIdx) => (
                  <li key={item.year}>
                    <div className="relative pb-8">
                      {itemIdx !== historyData.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <span className="text-white text-sm font-medium">
                              {item.year.slice(1)}
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-lg font-semibold text-gray-900">
                              {item.year}
                            </p>
                            <div className="mt-2">
                              {item.events.map((event, eventIdx) => (
                                <p
                                  key={eventIdx}
                                  className="text-gray-600 mb-1"
                                >
                                  {event}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
