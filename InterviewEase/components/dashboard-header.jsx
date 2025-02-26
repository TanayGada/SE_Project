"use client"
import { useState, useEffect } from "react";
import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs";
import ScheduleInterview from "./recruiter/schedule-interview";

export default function DashboardHeader({ triggerRefresh }) {
  const [top, setTop] = useState(true);
  const { user } = useUser();
  const role = user?.publicMetadata.UserRole;
  console.log("user", user);  
  console.log("role", role);
  
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed top-0 left-[264px] right-0 z-50 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="px-5 sm:px-6 max-w-full">
        <div className="flex items-center justify-between h-16 md:h-20">
          <nav className="flex grow">
            <ul className="flex grow justify-end flex-wrap items-center">
              {role === "recruiter" && (
                <li>
                  <ScheduleInterview onSuccessfulSchedule={triggerRefresh} />
                </li>
              )}
              <li>
                <SignOutButton>
                  <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                    Log Out
                  </button>
                </SignOutButton>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}