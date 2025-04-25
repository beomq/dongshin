"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">회사 정보</h3>
            <div className="space-y-2 text-gray-300">
              <p>주식회사 동신프라스틱</p>
              <p>대표이사: 박일우</p>
              <p>사업자등록번호: 107-81-86502</p>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <div className="space-y-2 text-gray-300">
              <p>전화: 02-2676-0626</p>
              <p>팩스: 02-2635-3754</p>
              <p>이메일: Resins4228@daum.net</p>
              <p>주소: 서울시 영등포구 영등포로 18길 2</p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/company/about" className="hover:text-blue-400">
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-400">
                  제품소개
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-blue-400">
                  설비현황
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 동신프라스틱. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
