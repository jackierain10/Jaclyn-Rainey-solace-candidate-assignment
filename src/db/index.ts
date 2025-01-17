import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocates } from "./schema";
import { sql } from "drizzle-orm";
import { NewAdvocate } from "../app/type";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      db: null,
      addAdvocate: async () => {
        throw new Error("DATABASE_URL is not configured.")
      },
      getAdvocates: async () => {
        throw new Error("DATABASE_URL is not configured.")
      },
    };
  }

  const queryClient = postgres(process.env.DATABASE_URL, {
    max: 10
  });
  const db = drizzle(queryClient);

  const getAdvocates = async (page = 1, pageSize = 10, search = "") => {
    return await db
      .select({
        record: advocates,
        count: sql<number>`count(*) over()`,
      })
      .from(advocates)
      .where(
        sql`LOWER(${advocates.firstName}) LIKE ${`%${search.toLowerCase()}%`} OR LOWER(${advocates.lastName}) LIKE ${`%${search.toLowerCase()}%`}`
      )
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  };

  const addAdvocate = async (newAdvocateRecord: NewAdvocate) => {
    return await db.insert(advocates).values(newAdvocateRecord).returning();
  }

  return {
    db,
    getAdvocates,
    addAdvocate,
  };
};

export default setup();
