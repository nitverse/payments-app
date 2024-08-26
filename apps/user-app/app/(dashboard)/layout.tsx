"use client";

import React, { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SidebarItem from "../../components/SidebarItem";
import { Appbar } from "@repo/ui/appbar";
import { House, ArrowLeftRight, Send, Wallet } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 font-bold text-2xl">Payments app</div>
        <nav className="">
          <SidebarItem
            href="/dashboard"
            icon={<House size={20} />}
            title="Home"
          />
          <SidebarItem
            href="/transfer"
            icon={<Wallet size={20} />}
            title="Add Money"
          />
          <SidebarItem
            href="/transactions"
            icon={<ArrowLeftRight size={20} />}
            title="Transactions"
          />
          <SidebarItem
            href="/p2p"
            icon={<Send size={20} />}
            title="P2P Transfer"
          />
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto overflow-hidden flex flex-col">
        <Appbar
          user={session?.user}
          onSignin={handleSignIn}
          onSignout={handleSignOut}
        />
        <div className="flex-1 p-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
