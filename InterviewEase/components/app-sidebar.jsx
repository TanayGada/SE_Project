"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React from "react";

const AppSidebar = ({ items }) => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen flex-col bg-[#0A2342] justify-between bg-dark-1 p-6 pt-24 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6 ">
        {items.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              style={{borderRadius: "8px"}}
              className={cn(
                "flex gap-4 items-center p-4  justify-start", // Added 'rounded-lg' for border-radius
                { "bg-[#2463EB]": isActive }
              )}
            >
              <p className="text-lg text-white font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AppSidebar;
