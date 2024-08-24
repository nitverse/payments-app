"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import React, { useState } from "react";
import {TextInput} from "./TextInput";
import { Select } from "@repo/ui/Select";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

interface AddMoneyCardProps{
  name: string;
}
const AddMoneyCard = ({name} : AddMoneyCardProps) => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );

  return (
    <Card title={`Hey ${name} 👋`}>
      <div className="w-full space-y-6">
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={() => {}}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank
          </label>
          <Select
            onSelect={(value) => {
              setRedirectUrl(
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
              );
            }}
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
        </div>
        <div className="pt-4">
          <button
            onClick={() => {}}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Add Money
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AddMoneyCard;
