import { NextRequest, NextResponse } from "next/server";

import validateApiKey from "../../../lib/middlewares/validateApiKey";

export async function GET(req: NextRequest, { params }: { params: { league: string; }; }) {
try {
  const apiKey = req.headers.get('x-api-key')
  const resp = await validateApiKey(apiKey)

  if (resp?.valid) {
    return NextResponse.json({ data: resp?.currentUser }, { status: 200 }
    );
  } else {
    const error = resp?.error
    const statusCode = resp?.status
    return NextResponse.json(error, { status: statusCode });
  }

} catch (error) {
  return NextResponse.json({ error: 'Error while authorizing user.' }, { status: 500 });
}

}
