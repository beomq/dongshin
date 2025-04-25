"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

interface MenuItem {
  name: string;
  href: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "회사소개",
    href: "#",
    subItems: [
      { name: "회사개요", href: "/company/about" },
      { name: "인사말", href: "/company/greeting" },
      { name: "조직도", href: "/company/organization" },
      { name: "연혁", href: "/company/history" },
      { name: "오시는길", href: "/company/location" },
    ],
  },
  {
    name: "제품소개",
    href: "#",
    subItems: [
      { name: "롯데케미칼", href: "/products/lotte" },
      { name: "삼양사", href: "/products/samyang" },
      { name: "쎌라니즈", href: "/products/celanese" },
      { name: "HDC현대이피", href: "/products/hdc" },
      { name: "한화토탈", href: "/products/hanwha" },
      { name: "Other", href: "/products/other" },
    ],
  },
  {
    name: "적용분야",
    href: "#",
    subItems: [{ name: "적용분야", href: "/applications/fields" }],
  },
  {
    name: "고객센터",
    href: "#",
    subItems: [
      { name: "공지사항", href: "/support/notice" },
      { name: "문의하기", href: "/contact" },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                동신프라스틱
              </span>
            </Link>
          </div>
          <nav className="px-4 sm:px-6 lg:px-8">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setHoveredMenu(item.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <span
                    className={`inline-flex items-center px-1 pt-1 pb-2 text-sm font-medium cursor-default ${
                      isActive(item.href === "#" ? item.name : item.href)
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.subItems && hoveredMenu === item.name && (
                    <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <ul className="py-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm ${
                                isActive(subItem.href)
                                  ? "text-blue-600 bg-gray-50"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
