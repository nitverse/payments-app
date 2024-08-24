import React from "react";
import { db } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import AddMoneyCard from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await db.balance.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

const Page = async () => {
  const session = await getServerSession(authOptions);
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 text-center tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Transfer Money
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Add Money
            </h2>
            <AddMoneyCard name={session?.user?.name || "user"} />
          </div>

          <div className="space-y-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                Balance Overview
              </h2>
              <BalanceCard amount={4500} locked={balance.locked} />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                Recent Transactions
              </h2>
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
