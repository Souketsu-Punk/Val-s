import { NextResponse } from "next/server";
import { createValentine } from "../../../lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const { message, senderName, anonymous } = await req.json();

  const id = randomUUID();

  await createValentine({
    id,
    message,
    senderName: anonymous ? undefined : senderName,
    anonymous,
    createdAt: Date.now()
  });

  return NextResponse.json({ id });
}
