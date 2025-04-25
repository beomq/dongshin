"use client";

import Layout from "../../components/layout/Layout";

export default function FacilitiesPage() {
  const facilities = [
    {
      category: "생산설비",
      items: [
        {
          name: "사출성형기",
          specs: "50톤 ~ 850톤",
          count: "20대",
        },
        {
          name: "건조기",
          specs: "제습식",
          count: "10대",
        },
        {
          name: "혼합기",
          specs: "200L",
          count: "5대",
        },
      ],
    },
    {
      category: "검사설비",
      items: [
        {
          name: "인장시험기",
          specs: "Universal Testing Machine",
          count: "2대",
        },
        {
          name: "경도계",
          specs: "Shore D",
          count: "3대",
        },
        {
          name: "수분측정기",
          specs: "Digital",
          count: "2대",
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">설비현황</h1>
        <div className="space-y-12">
          {facilities.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold mb-6 text-blue-600">
                {category.category}
              </h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        설비명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        사양
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        수량
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {category.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.specs}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
