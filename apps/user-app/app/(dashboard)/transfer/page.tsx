import React from "react";
import { db } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import AddMoneyCard from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { CreditCard, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-2 sm:p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-indigo-900 mb-5 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Add Money
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <CreditCard className="text-indigo-600 mr-3" size={28} />
                <h2 className="text-3xl font-semibold text-indigo-800">
                  Add Money
                </h2>
              </div>
              <AddMoneyCard name={session?.user?.name || "user"} />
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock className="text-indigo-600 mr-3" size={28} />
                  <h2 className="text-3xl font-semibold text-indigo-800">
                    Recent Transactions
                  </h2>
                </div>
                <Link
                  href="/transactions"
                  className="flex items-center underline gap-2 text-indigo-600 hover:text-indigo-800 text-lg font-semibold transition-colors duration-200"
                >
                  View All Transactions
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl text-white">
              <div className="flex items-center mb-4">
                <ArrowUpRight className="mr-3" size={28} />
                <h2 className="text-3xl font-semibold">Balance Overview</h2>
              </div>
              <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200">
                  Send Money
                </button>
                <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200">
                  Request Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
