"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import { db } from "@repo/db";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error While sending money",
    };
  }

  const toUser = await db.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "ToUser not found",
    };
  }

  if (from === toUser.id) {
    return {
      message: "same UserId => Transaction declined",
    };
  }

  try {
    await db.$transaction(async (tx:any) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: from },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient Funds");
      }

      await new Promise((r) => setTimeout(r, 4000));

      await tx.balance.update({
        where: { userId: from },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.p2pTransfers.create({
        data: {
          fromUserId: from,
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });

      await tx.onRampTransaction.create({
        data: {
          status: "Success",
          token: `ToP2P-${Date.now()}`,
          provider: "P2P Transfer " + session?.user?.name,
          amount: amount,
          startTime: new Date(),
          userId: toUser.id,
          type: "Credit",
        },
      });

      await tx.onRampTransaction.create({
        data: {
          status: "Success",
          token: `FromP2P-${Date.now()}`,
          provider: "P2P Transfer " + toUser.name,
          amount: amount,
          startTime: new Date(),
          userId: from,
          type: "Debit",
        },
      });
      return {
        message: "Transfer successful",
      };
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    return {
      message: "Error while sending money",
    };
  }
}
