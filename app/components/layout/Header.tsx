"use client";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = {
  categories: [
    {
      name: "회사소개",
      items: [
        { name: "인사말", href: "/company/greeting" },
        { name: "연혁", href: "/company/history" },
        { name: "설비현황", href: "/company/facilities" },
        { name: "오시는길", href: "/company/location" },
      ],
    },
    {
      name: "제품소개",
      items: [
        { name: "BASF", href: "/products/basf" },
        { name: "KEP", href: "/products/kep" },
        { name: "Others", href: "/products/others" },
        { name: "동신", href: "/products/dongshin" },
      ],
    },
    {
      name: "적용분야",
      items: [
        { name: "PA", href: "/applications/pa" },
        { name: "POM", href: "/applications/pom" },
        { name: "Super Enpla", href: "/applications/super-enpla" },
        { name: "Recycle", href: "/applications/recycle" },
      ],
    },
    {
      name: "기술정보",
      items: [{ name: "기술정보", href: "/technology/info" }],
    },
    {
      name: "고객센터",
      items: [
        { name: "공지사항", href: "/support/notice" },
        { name: "사내소식", href: "/support/news" },
        { name: "제품문의", href: "/support/inquiry" },
      ],
    },
  ],
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      {/* 상단 정보 바 */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div>Tel: 000-000-0000</div>
          <div className="flex space-x-4">
            <Link href="/admin/login" className="hover:text-gray-300">
              관리자
            </Link>
            <Link href="#" className="hover:text-gray-300">
              KOR
            </Link>
            <Link href="#" className="hover:text-gray-300">
              ENG
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <div className="bg-white border-b">
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-blue-900">
                  동신프라스틱
                </span>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">메뉴 열기</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600">
                        {category.name}
                        <ChevronDownIcon
                          className={`h-4 w-4 transition ${
                            open ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* 모바일 메뉴 */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-blue-900">
                동신프라스틱
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">메뉴 닫기</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.categories.map((category) => (
                  <Disclosure as="div" key={category.name} className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          {category.name}
                          <ChevronDownIcon
                            className={`h-5 w-5 transition ${
                              open ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
