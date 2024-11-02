import AppSidebar from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard-header";
const items = [
  { label: "Upcoming Interviews", route: "/recruiter/upcoming-interviews" },
  { label: "Past Interviews", route: "/recruiter/past-interviews" },
  { label: "Interview Templates", route: "/recruiter/interview-templates" },
  { label: "Interview Reports", route: "/recruiter/interview-reports" },
  { label: "Profile", route: "/recruiter/profile" },
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
