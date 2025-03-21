import { NextResponse } from "next/server";
import { prisma } from "@/src/app/lib/prisma";

export async function GET(req: Request) {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is required.", description: "unauthenticated." },
      { status: 401 }
    );
  }

  try {
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { user: true },
    });

    if (!apiKeyRecord || !apiKeyRecord.user) {
      return NextResponse.json(
        { error: "Invalid API key", description: "unauthorized." },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, user: apiKeyRecord.user });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json(
      { error: "Internal server error", description: "database error" },
      { status: 500 }
    );
  }
}
