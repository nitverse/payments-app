"use client";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { Send, Phone, IndianRupee } from 'lucide-react';
import { p2pTransfer } from "../lib/actions/p2pTransaction";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async() => {
    console.log("Sending", amount, "to", number);

    await p2pTransfer(number, Number(amount));
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Send Money</h2>
        <div className="space-y-6">
          <div className="relative">
            <label  className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Number
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="number"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter recipient's number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="amount"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <Button 
            onClick={handleSend}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Money
          </Button>
        </div>
      </div>
    </div>
  );
}
