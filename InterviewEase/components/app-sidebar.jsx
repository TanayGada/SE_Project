"use client"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link"; // Import Link from Next.js
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.


export function AppSidebar({items}) {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-[#2463EB] text-white">
      <div className="mt-20">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className={cn("flex items-center space-x-2 hover:bg-[#2CD2C0] px-4 py-2 rounded-md ",{"bg-[#2CD2C0]":isActive})}>
                        <item.icon className="text-white" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )})}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}