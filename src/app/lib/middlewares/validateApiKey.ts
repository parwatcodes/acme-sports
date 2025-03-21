import { NextResponse } from "next/server";

import { prisma } from "@/src/app/lib/prisma";
import { AuthenticatedRequest } from '@/src/app/utils/interfaces';

/**
 * The function `validateApiKey` checks if a valid API key is provided in the request headers and
 * authenticates the user associated with that key.
 */
export default async function validateApiKey(apiKey: string | null) {
  try {
    if (!apiKey) {
      return {
        valid: false,
        error: { error: 'API key is required.', description: 'unauthenticated.' },
        status: 401
      };
    }

    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: {
        key: apiKey
      },
      include: {
        user: true
      }
    });

    if (!apiKeyRecord || !apiKeyRecord.user) {
      return { valid: false, error: { error: "Invalid API key", description: "unauthorized." }, status: 403};
    }

    const { user: { id, email }, key } = apiKeyRecord;
    const currentUser = {
      id,
      email,
      apiKey: key
    };

    return { valid: true, currentUser };
  } catch (error) {
    console.error("Error: ", error);
  }
}
