import AppSidebar from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { StreamVideoProvider } from "@stream-io/video-react-sdk";
const items = [
  {
    label: "Upcoming Interviews",
    route: "/applicant/upcoming-interviews",
  },
  {
    label: "Past Interviews",
    route: "/applicant/past-interviews",
  },
  {
    label: "Interview Preparation",
    route: "/applicant/interview-preparation",
  },
  {
    label: "Mock Interview",
    route: "/applicant/mock-interview",
  },
  
  {
    label: "Profile",
    route: "/applicant/profile",
  },
];

export default function Layout({ children }) {
  return (
    <main className="relative bg-[#F3F4F6] min-h-screen flex">
      
      {/* Sidebar */}
      
      <AppSidebar items={items} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at Top */}
        <DashboardHeader />

        {/* Content Section */}
        <section className="flex-1 px-6 py-24 max-md:pb-0 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
      
    </main>
  );
}
