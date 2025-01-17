import db from "../../../db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.firstName || !body.lastName || !body.city || !body.degree || !body.phoneNumber) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const specialties = body.specialties
      ? body.specialties.split(",").map((s: string) => s.trim())
      : [];

    const { addAdvocate } = db;
    const newAdvocate = await addAdvocate({ ...body, specialties });

    return new Response(
      JSON.stringify(newAdvocate),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating new advocate:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create advocate." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

