"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import StreamVideoProvider from "@/providers/StreamClientProvider";

const items = [
  { label: "Upcoming Interviews", route: "/recruiter/upcoming-interviews" },
  { label: "Past Interviews", route: "/recruiter/past-interviews" },
  { label: "Interview Templates", route: "/recruiter/interview-templates" },
  { label: "Interview Reports", route: "/recruiter/interview-reports" },
  { label: "Profile", route: "/recruiter/profile" },
];

export default function Layout({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    if (refreshKey > 0) {
      router.refresh();
    }
  }, [refreshKey, router]);

  return (
    <main className="relative bg-[#F3F4F6] min-h-screen flex">
      <StreamVideoProvider>
        <AppSidebar items={items} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader triggerRefresh={triggerRefresh} />
          <section className="flex-1 px-6 py-24 max-md:pb-0 sm:px-14">
            <div className="w-full">{children}</div>
          </section>
        </div>
      </StreamVideoProvider>
    </main>
  );
}