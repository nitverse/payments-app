"use client";

import { useBalance } from "@repo/store/src/hooks/useBalance";

export default function Home() {
  const balance = useBalance();
  return <div>***Under Development *** hi there {balance}</div>;
}
