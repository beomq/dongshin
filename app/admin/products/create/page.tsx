"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductForm {
  name: string;
  description: string;
  manufacturer: string;
  applications: string[];
  properties: string[];
}

export default function CreateProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    manufacturer: "",
    applications: [""],
    properties: [""],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        alert("제품 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("제품 추가 중 오류가 발생했습니다.");
    }
  };

  const addField = (field: "applications" | "properties") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeField = (field: "applications" | "properties", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const updateField = (
    field: "applications" | "properties",
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">제품 추가</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">제품명</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">제조사</label>
                  <select
                    required
                    value={formData.manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, manufacturer: e.target.value })
                    }
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="">제조사 선택</option>
                    <option value="lotte">롯데케미칼</option>
                    <option value="samyang">삼양사</option>
                    <option value="hdc">HDC현대EP</option>
                    <option value="celanese">쎌라니즈</option>
                    <option value="hanwha">한화솔루션</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">제품 설명</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">적용분야</label>
                  {formData.applications.map((app, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <input
                        type="text"
                        required
                        value={app}
                        onChange={(e) =>
                          updateField("applications", index, e.target.value)
                        }
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {formData.applications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField("applications", index)}
                          className="text-red-500"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("applications")}
                    className="mt-2 text-blue-500 text-sm"
                  >
                    적용분야 추가
                  </button>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">특성</label>
                  {formData.properties.map((prop, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <input
                        type="text"
                        required
                        value={prop}
                        onChange={(e) =>
                          updateField("properties", index, e.target.value)
                        }
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {formData.properties.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField("properties", index)}
                          className="text-red-500"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("properties")}
                    className="mt-2 text-blue-500 text-sm"
                  >
                    특성 추가
                  </button>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  제품 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
