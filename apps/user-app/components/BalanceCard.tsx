import React from "react";
import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="">
      <div className="">
        <div className="flex justify-between items-center py-3">
          <span className="text-sm font-semibold text-green-600">
            Available Balance
          </span>
          <span className="text-base text-green-600">
            ₹{(amount / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="text-sm text-gray-600">Locked Balance</span>
          <span className="text-base text-gray-800">
            ₹{(locked / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 pt-4 border-t border-slate-200">
          <span className="text-sm text-gray-600">Total Balance</span>
          <span className="text-lg font-bold text-gray-800">
            ₹{((amount + locked) / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};
