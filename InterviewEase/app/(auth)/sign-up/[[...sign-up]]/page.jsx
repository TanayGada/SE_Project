"use client";
import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { setUserRole } from "@/app/(default)/_actions"; 
import { useRouter } from "next/navigation";

export default function SignUpWithRole() {
  const user = useUser();
  const router = useRouter();

 
  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  );
}