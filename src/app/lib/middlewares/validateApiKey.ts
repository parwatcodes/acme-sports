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
        error: 'API key is required.',
        description: 'unauthenticated.',
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
      return {
        error: "Invalid API key",
        description: "unauthorized.",
        status: 403
      };
    }

    const { user: { id, email }, key } = apiKeyRecord;
    const currentUser = {
      id,
      email,
      apiKey: key
    };

    return { data: currentUser, description: 'User details for api key provided', status: 200 };
  } catch (error) {
    console.error("Error from validateApiKey func: ", error);
    return {
      error: `Error while validating api key`,
      description: error,
      status: 500
    };
  }
}
