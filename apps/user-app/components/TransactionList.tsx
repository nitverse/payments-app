"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@repo/ui/card";

interface Transaction {
  time: string;
  amount: number;
  status: string;
  provider: string;
  type: "Credit" | "Debit";
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card title="Recent Transactions">
        <div className="h-full px-3 pr-2">
          <div className="space-y-4">
            {sortedTransactions.map((t, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 ${t.type === "Credit" ? "bg-green-100" : "bg-red-100"} rounded-full flex items-center justify-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={`${t.type === "Credit" ? "text-green-700" : "text-red-700"} h-6 w-6`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">
                      {t.type === "Credit" ? "Received from" : "Sent to"}{" "}
                      {t.provider}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(t.time).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold text-2xl ${t.type === "Credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {t.type === "Credit" ? "+" : "-"} ₹{t.amount.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm px-2 py-1 rounded-full inline-block mt-1 ${
                      t.status === "Success"
                        ? "bg-green-100 text-green-800"
                        : t.status === "Failure"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransactionsList;
