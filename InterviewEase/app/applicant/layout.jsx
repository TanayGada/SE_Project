import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/ui/header"

const items = [
  {
    title: "Upcoming Interviews",
    url: "/applicant/upcoming-interviews",
    icon: "home",
  },
  {
    title: "Interview Preparation",
    url: "/applicant/interview-preparation",
    icon: "inbox",
  },
  {
    title: "Mock Interview",
    url: "/applicant/mock-interview",
    icon: "calendar",
  },
  {
    title: "Track Performance",
    url: "/applicant/track-performance",
    icon: "search",
  },
  {
    title: "Profile",
    url: "/applicant/profile",
    icon: "settings",
  },
];

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main>
        <SidebarTrigger />
        <div className="flex flex-col h-screen ml-10">
        {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
