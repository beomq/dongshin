"use client";

import React from "react";
import Layout from "../../components/layout/Layout";

interface Department {
  name: string;
  children?: (Department | string)[];
}

export default function OrganizationPage() {
  const departments: Department[] = [
    {
      name: "대표이사",
      children: [
        {
          name: "국내영업1팀",
          children: ["국내 Business", "전기 / 전자", "화장품"],
        },
        {
          name: "국내영업2팀",
          children: ["국내 Business", "자동차", "기타 잡화"],
        },
        {
          name: "관리부",
          children: ["인사 / 총무", "재무 / 회계", "자재"],
        },
        {
          name: "수출법인",
          children: ["해외 Business", "해외 거래선 관리 / 운영", "수출 업무"],
        },
        {
          name: "해외영업",
          children: ["Vietnam 법인 운영", "Vietnam 전기 / 전자 / 자동차"],
        },
      ],
    },
  ];

  const renderDepartment = (dept: Department, level: number = 0) => {
    return (
      <div key={dept.name} style={{ marginLeft: `${level * 20}px` }}>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2" />
          <span className="font-semibold">{dept.name}</span>
        </div>
        {dept.children && (
          <div className="ml-6">
            {dept.children.map((child, index) => {
              if (typeof child === "string") {
                return (
                  <div key={index} className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2" />
                    <span>{child}</span>
                  </div>
                );
              }
              return renderDepartment(child, level + 1);
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow p-6">
        {departments.map((dept) => renderDepartment(dept))}
      </div>
    </Layout>
  );
}
