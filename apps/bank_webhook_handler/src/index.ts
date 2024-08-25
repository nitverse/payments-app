import { db } from "@repo/db/client";
import express from "express";

const app = express();
app.use(express.json());

app.post("/hdfcwebhook", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    console.log(req.body);
    await db.$transaction([
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    db.balance.updateMany({
      where: {
        userId: paymentInformation.userId,
      },
      data: {
        amount: {
          increment: Number(paymentInformation.amount) * 100,
        },
      },
    });

    console.log(
      `Balance updated for user ${paymentInformation.userId} with amount ${paymentInformation.amount}`
    );

    res.status(200).json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
