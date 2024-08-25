import { db } from "..";
import bcrypt from "bcrypt";

async function main() {
  const nitant = await db.user.upsert({
    where: { number: "1111111111" },
    update: {},
    create: {
      number: "1111111111",
      password: await bcrypt.hash("nitant", 10),
      name: "nitant",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "tok3n__1",
          provider: "HDFC Bank",
        },
      },
    },
  });

  const john = await db.user.upsert({
    where: { number: "2222222222" },
    update: {},
    create: {
      number: "2222222222",
      password: await bcrypt.hash("john", 10),
      name: "nitant",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "tok3n__2",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ nitant, john });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
