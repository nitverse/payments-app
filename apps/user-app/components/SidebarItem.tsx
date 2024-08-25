"use client";

import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

const SidebarItem: FC<SidebarItemProps> = ({ href, title, icon }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <motion.div
      className={`flex items-center m-4 cursor-pointer p-3 rounded-lg transition-colors duration-200 ease-in-out ${
        isSelected
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          : "hover:bg-gray-100 text-gray-600"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="mr-3 text-xl">{icon}</div>
      <motion.div
        className={`font-semibold ${isSelected ? "text-white" : "text-gray-700"}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.div>
    </motion.div>
  );
};

export default SidebarItem;
