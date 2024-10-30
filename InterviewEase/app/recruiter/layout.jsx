import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/ui/header"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

const items = [
  {
    title: "Upcoming Interviews",
    url: "/recruiter/upcoming-interviews",
    icon: "home",
  },
  {
    title: "Candidate List",
    url: "/recruiter/candidate-list",
    icon: "inbox",
  },
  {
    title: "Interview Templates",
    url: "/recruiter/interview-templates",
    icon: "calendar",
  },
  {
    title: "Interview Reports",
    url: "/recruiter/interview-reports",
    icon: "search",
  },
  {
    title: "Profile",
    url: "/recruiter/profile",
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
