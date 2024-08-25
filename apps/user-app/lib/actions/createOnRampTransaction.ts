"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { db } from "@repo/db";
import crypto from "crypto";

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
        amount: Math.round(amount * 100),
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return {
      success: true,
      message: "Transaction added",
      transactionId: transaction.id,
      token: token,
    };
  } catch (error) {
    console.error("Error creating on-ramp transaction:", error);
    return {
      success: false,
      message: "An error occurred while processing the transaction",
    };
  }
}
