// import logger from "./logger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

// prisma.$on("query", (event) => {
//   const params = JSON.parse(event.params) as unknown[];
//   logger.sql(event.query, ["0", ...params.map((p) => `${p}`)], event.duration);
// });

export default prisma;
