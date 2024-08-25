// app/dashboard/page.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/"); // Redirect to home page after sign out
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Appbar
        user={session?.user}
        onSignin={handleSignIn}
        onSignout={handleSignOut}
      />
      <div className="p-4">
        {session ? (
          <div>
            <h1>Welcome to your Dashboard, {session.user?.name}</h1>
            {/* Add your dashboard content here */}
          </div>
        ) : (
          <div>
            <h1>Please sign in to view your dashboard</h1>
          </div>
        )}
      </div>
    </div>
  );
}
