import React from "react";
import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
    type: "Credit" | "Debit";
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="flex items-center justify-center text-gray-500">
          <p>No recent transactions</p>
        </div>
      </Card>
    );
  }

  // Sort transactions by time in descending order (latest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => b.time.getTime() - a.time.getTime()
  );

  return (
    <Card title="Recent Transactions">
      <div className="h-40 overflow-y-auto px-3 pr-2">
        <div className="space-y-4">
          {sortedTransactions.map((t, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    {t.type === "Credit" ? "Received" : "Sent"} INR
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      t.status === "Success"
                        ? "bg-green-100 text-green-800"
                        : t.status === "Failure"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {t.time.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Via {t.provider}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-sm px-4 font-semibold ${
                    t.type === "Credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "Credit" ? "+" : "-"} ₹{t.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
