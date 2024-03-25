"use client";
import Logo from "./Logo";
import { Menu } from "@headlessui/react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
export default function Navbar() {
  return (
    <header className="py-10 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a aria-label="Home" href="#">
              <Logo />
            </a>
            <div className="hidden md:flex md:gap-x-6 transition-all duration-300">
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="#features">
                Features
              </a>
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="#testimonials">
                Testimonials
              </a>
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="#pricing">
                Pricing
              </a>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <LoginLink
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                Sign in
              </LoginLink>
            </div>
            <LoginLink className="group text-[10px]  py-1 px-2 sm:py-2 sm:p4 sm:text-sm inline-flex items-center justify-center rounded-md text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-700 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600">
              Get Started Today
            </LoginLink>
            <div className="-mr-1 md:hidden">
              <Menu as="div" className="relative transition-all duration-300">
                <Menu.Button className="flex transition-all duration-300 h-8 w-8 items-center justify-center rounded-md  text-white  hover:bg-slate-200 ">
                  <span className="sr-only">Open menu</span>
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round">
                    <path
                      d="M0 1H14M0 7H14M0 13H14"
                      className="origin-center transition"></path>
                    <path
                      d="M2 2L12 12M12 2L2 12"
                      className="origin-center transition scale-90 opacity-0"></path>
                  </svg>
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 transition-opacity duration-300 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#features"
                          className={`block px-4 py-2 text-sm text-slate-700 ${
                            active ? "bg-slate-100" : ""
                          }`}>
                          Features
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#testimonials"
                          className={`block px-4 py-2 text-sm text-slate-700 ${
                            active ? "bg-slate-100" : ""
                          }`}>
                          Testimonials
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#pricing"
                          className={`block px-4 py-2 text-sm text-slate-700 ${
                            active ? "bg-slate-100" : ""
                          }`}>
                          Pricing
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
