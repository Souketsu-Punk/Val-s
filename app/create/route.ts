import { NextResponse } from "next/server";
import { createValentine } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const { message } = await req.json();
  const id = randomUUID();

  createValentine({ id, message });

  return NextResponse.json({ id });
}
