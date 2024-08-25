"use client";

import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { Select } from "@repo/ui/Select";
import { useRouter } from "next/navigation";
import createOnRampTransaction from "../lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS: { name: string; redirectUrl: string }[] = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

interface AddMoneyCardProps {
  name: string;
}

const AddMoneyCard = ({ name }: AddMoneyCardProps) => {
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>( SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);

  const router = useRouter();

  const onClick = async () => {
    if (redirectUrl) {
      console.log(value);
      await createOnRampTransaction(provider,value);
      router.push(redirectUrl);
    } else {
      console.error("Redirect URL is undefined");
    }
  };

  const handleAmountChange = (val: string) => {
    const numericValue = parseFloat(val);
    setValue(isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <div className="w-full space-y-6">
      <TextInput
        label="Amount"
        placeholder="Enter amount"
        onChange={handleAmountChange}
        type="number"
        step="0.01"
        min="0"
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
            setProvider(value);
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
      </div>
      <div className="pt-4">
        <button
          onClick={onClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Add Money
        </button>
      </div>
    </div>
  );
};

export default AddMoneyCard;
