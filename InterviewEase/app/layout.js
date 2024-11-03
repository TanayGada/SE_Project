// Import global CSS and Google font
import "./css/style.css";
import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import { ClerkProvider } from "@clerk/nextjs";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "@/components/ui/toaster";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// Setting up the Inter font with specific subsets and display options
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Metadata for the page
export const metadata = {
  title: "InterviewEase",
  description:
    "A comprehensive interview platform designed to eliminate bias, enhance transparency, and provide standardized metrics for evaluations, benefiting both interviewers and applicants throughout the hiring process.",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    // Wrap the entire application with ClerkProvider
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
          {/* Wrap content inside the StreamVideoProvider */}
          <StreamVideoProvider>
            <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
              {children} {/* Render child components (page content) */}
              <Toaster />
            </div>
          </StreamVideoProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}