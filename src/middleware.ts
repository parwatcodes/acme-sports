import { NextResponse } from "next/server";

import { AuthenticatedRequest } from '@/src/app/utils/interfaces';
import axiosInstance from "./app/lib/axios";

/**
 * The middleware function logs a message, makes a request to an API to check whether the incoming request has api key to access the endpoints or not?
 * @param {AuthenticatedRequest} req - The `req` parameter in the `middleware` function is of type
 * `AuthenticatedRequest`, which likely contains information about the authenticated user making the
 * request. This parameter is used to access and modify the request object within the middleware
 * function.
 * @returns The `middleware` function is returning either `NextResponse.next()` if the axios request is
 * successful, or `NextResponse.json(message, { status })` if there is an error during the axios
 * request.
 */
export async function middleware(req: AuthenticatedRequest) {
  console.log("logging from middleware......");
  const { pathname } = req.nextUrl;

  // Avoids running apiKey validation middleware in the api (which does validation) itself, Eliminates unnecessary db calls.
  if (excludedApiRoutes.some(route => pathname.startsWith(route))) return NextResponse.next();

  try {
    const res = await axiosInstance.get("/auth/authorized-access");
    req.user = res.data;

    return NextResponse.next();
  } catch (error: any) {
    const { data, status } = error.response;
    return NextResponse.json(data, { status });
  }
}

const excludedApiRoutes = [
  '/api/auth/authorized-access'
]

export const config = {
  matcher: "/api/team_list/:path*"
};
