"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { db } from "@repo/db";
import crypto from "crypto";
import axios from "axios";

export default async function createOnRampTransaction(
  provider: string, 
  amount: number
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
      return {
        success: false,
        message: "Unauthorized request",
      };
    }

    if (isNaN(amount) || amount <= 0) {
      return {
        success: false,
        message: "Invalid amount",
      };
    }

    const token = crypto.randomBytes(16).toString("hex");
    const transaction = await db.onRampTransaction.create({
      data: {
        provider,
        status: "Processing",
        startTime: new Date(),
        token: token,
        amount: amount,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    const webhookUrl = "http://localhost:3003/hdfcwebhook";
    const webhookResponse = await axios.post(
      webhookUrl,
      {
        token: token,
        user_identifier: session.user.id,
        amount: amount.toString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: "Transaction added and webhook notified",
      transactionId: transaction.id,
      token: token,
      webhookResult: webhookResponse.data,
    };
  } catch (error) {
    console.error("Error processing transaction:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    }
    return {
      success: false,
      message: "An error occurred while processing the transaction",
    };
  }
}
