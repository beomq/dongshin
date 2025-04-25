"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  applications: string[];
}

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Product>({
    id: params.id,
    name: "",
    category: "",
    description: "",
    features: [""],
    applications: [""],
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert("제품을 찾을 수 없습니다.");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("제품 데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("제품 데이터를 불러오는 중 오류가 발생했습니다.");
      router.push("/admin/products");
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleApplicationChange = (index: number, value: string) => {
    const newApplications = [...formData.applications];
    newApplications[index] = value;
    setFormData({ ...formData, applications: newApplications });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const addApplication = () => {
    setFormData({ ...formData, applications: [...formData.applications, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const removeApplication = (index: number) => {
    const newApplications = formData.applications.filter((_, i) => i !== index);
    setFormData({ ...formData, applications: newApplications });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        alert("제품 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("제품 수정 중 오류가 발생했습니다:", error);
      alert("제품 수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">제품 수정</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제품명
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제품 설명
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            특징
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 hover:text-blue-800"
          >
            + 특징 추가
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            적용 분야
          </label>
          {formData.applications.map((application, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={application}
                onChange={(e) => handleApplicationChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              {formData.applications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeApplication(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addApplication}
            className="text-blue-600 hover:text-blue-800"
          >
            + 적용 분야 추가
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "처리 중..." : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
}
