import AppSidebar  from "@/components/app-sidebar"

const items = [
  {
    label: "Upcoming Interviews",
    route: "/recruiter/upcoming-interviews",
  },
  {
    label: "Past Interviews",
    route: "/recruiter/past-interviews",
  },
  {
    label: "Interview Templates",
    route: "/recruiter/interview-templates",
  },
  {
    label: "Interview Reports",
    route: "/recruiter/interview-reports",
  },
  {
    label: "Profile",
    route: "/recruiter/profile",
  },
];

export default function Layout({ children }) {
  return (
    <main className="relative bg-[#F3F4F6] ">
      <div className="flex ">
        <AppSidebar items={items} />
        <section className="flex min-h-screen flex-1 flex-col px-6 pt-24 max-md:pb-0 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}
