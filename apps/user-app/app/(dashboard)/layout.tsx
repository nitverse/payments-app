"use client";
import React, { FC } from "react";
import SidebarItem from "../../components/SidebarItem";
import { House, ArrowLeftRight, Send, Wallet } from "lucide-react";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
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
          <SidebarItem href="/transfer" icon={<Wallet size={20} />} title="Add Money" />
          <SidebarItem
            href="/transactions"
            icon={<ArrowLeftRight size={20} />}
            title="Transactions"
          />
          <SidebarItem href="/p2p" icon={<Send size={20}/>} title="P2P Transfer" />
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className=" mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
