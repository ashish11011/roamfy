import { handleDeleteTripById } from "lib";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  const res = await handleDeleteTripById(id);
  revalidatePath("/admin");
  revalidatePath("/");
  return new Response(JSON.stringify(res), { status: 200 });
}
