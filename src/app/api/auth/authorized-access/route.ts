import { NextRequest, NextResponse } from "next/server";

import validateApiKey from "../../../lib/middlewares/validateApiKey";

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key');
    const apiKeyData = await validateApiKey(apiKey);
    const { error, data, description, status } = apiKeyData;

    return NextResponse.json({ data, error, description }, { status });

  } catch (error) {
    return NextResponse.json({ error: 'Error while authorizing user.' }, { status: 500 });
  }

}
