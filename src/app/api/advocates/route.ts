import db from "../../../db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const search = url.searchParams.get("search") || "";

  try {
    const { getAdvocates } = db;

    const records = await getAdvocates(page, limit, search);
    const total = records.length > 0 ? records[0].count : 0;

    const data = records.map((record) => record.record);

    return new Response(
      JSON.stringify({
        data,
        total,
        page,
        limit,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch advocates data." }),
      { status: 500 }
    );
  }
}
