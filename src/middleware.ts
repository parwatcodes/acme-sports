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
  console.log('logging from middleware......');

  try {
    const res = await axiosInstance.get('/auth/authorized-access');
    req.user = res.data

    return NextResponse.next();
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data

    return NextResponse.json(message, { status })
  }
}

export const config = {
  matcher: "/api/:path*"
};
