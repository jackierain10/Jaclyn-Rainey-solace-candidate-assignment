import { NextResponse } from "next/server";
import db from "@/db";
import { advocates } from "@/db/schema";
import buildQuery from "@/app/utils/buildQuery";
import { PgSelect } from "drizzle-orm/pg-core";
import { Advocate } from "@/db/seed/advocates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filterModel, sortModel, offset = 0, limit = 50} = body;
    console.log(body)
    const fetchLimit = limit + 1

    const advocatesQuery = db.select().from(advocates) as any    
    const dynamicAdvocatesQuery = advocatesQuery.$dynamic().limit(fetchLimit).offset(offset)
     // buildQuery(dynamicQuery, filterModel, sortModel, offset, fetchLimit);

    const rawData = await dynamicAdvocatesQuery;
    const data = rawData.slice(0, limit)

    const moreDataAvailable = rawData.length > limit 
    const nextCursor = moreDataAvailable ? offset + limit : null;
 
    return NextResponse.json({ data, nextCursor });
  } catch (error) {
    const errorMessage = "Error fetching /api/advocates";
    console.error(errorMessage, error);

    return NextResponse.json({ status: 500, error: errorMessage });
  }
}
