import { NextResponse } from "next/server";
import { respondToValentine } from "@/lib/db";

export async function POST(req: Request) {
  const { id, response } = await req.json();
  respondToValentine(id, response);
  return NextResponse.json({ ok: true });
}
