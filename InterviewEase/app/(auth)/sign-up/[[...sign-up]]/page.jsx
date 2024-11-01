import { SignUp, useUser } from "@clerk/nextjs";

export default function SignUpWithRole() {

 
  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  );
}