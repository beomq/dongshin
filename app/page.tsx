import Image from "next/image";
import Layout from "./components/layout/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-16">
        {/* 메인 슬라이더 섹션 */}
        <section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          <div className="relative z-10 h-full flex items-center justify-center text-white">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                미래를 대체할 프리미엄 소재
              </h1>
              <p className="text-2xl md:text-3xl">
                Engineering Plastics 전문 기업
              </p>
            </div>
          </div>
        </section>

        {/* 제품 카테고리 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "롯데 케미칼",
                  description: "세계적인 화학 기업",
                  href: "/products/lotte",
                  bgColor: "bg-blue-600",
                },
                {
                  title: "삼양사",
                  description: "글로벌 화학기업",
                  href: "/products/samyang",
                  bgColor: "bg-green-600",
                },
                {
                  title: "쎄라니즈",
                  description: "혁신적인 소재 기업",
                  href: "/products/celanese",
                  bgColor: "bg-purple-600",
                },
                {
                  title: "한화 토타르",
                  description: "첨단 소재 전문기업",
                  href: "/products/hanwha",
                  bgColor: "bg-red-600",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${item.bgColor} text-white p-8 rounded-lg transition-transform hover:scale-105`}
                >
                  <div className="h-full flex flex-col justify-between">
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <div>
                      <p className="mb-4">{item.description}</p>
                      <span className="inline-flex items-center text-sm">
                        제품 보기
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 적용분야 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">적용분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "PA",
                  items: ["Transportation", "E&E Industrial", "Automotive"],
                },
                {
                  title: "POM",
                  items: [
                    "Fuel Systems",
                    "Industrial Parts",
                    "Precision Components",
                  ],
                },
                {
                  title: "Recycle",
                  items: [
                    "Sustainable Solutions",
                    "Eco-friendly Materials",
                    "Resource Recovery",
                  ],
                },
                {
                  title: "Others",
                  items: [
                    "Special Applications",
                    "Custom Solutions",
                    "Industrial Use",
                  ],
                },
              ].map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 최신 소식 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">최신 소식</h2>
              <Link
                href="/support/notice"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                더보기
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-2">2024-04-24</p>
                    <h3 className="text-xl font-semibold mb-2">
                      공지사항 제목이 들어갈 자리입니다
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      공지사항의 내용이 들어갈 자리입니다. 이 부분은 실제
                      데이터베이스에서 가져온 내용으로 대체됩니다.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 문의하기 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">문의하기</h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    문의 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    문의하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
