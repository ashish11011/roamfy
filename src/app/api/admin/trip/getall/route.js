import { getAllTrips } from "lib";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const res = await getAllTrips();
    return new Response(JSON.stringify({ data: res }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
