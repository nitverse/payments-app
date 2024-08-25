import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { db } from "@repo/db";
import TransactionsList from "../../../components/TransactionList";

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

const TransactionsPage = async () => {
  const transactions = await getOnRampTransactions();

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>
      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
