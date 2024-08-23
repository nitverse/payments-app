"use client";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export const RecoilProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  );
};
