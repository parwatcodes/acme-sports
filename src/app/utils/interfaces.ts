import { NextRequest } from "next/server";

export interface Route {
  name: string;
  link: string;
}

export interface Team {
  id: string;
  name: string;
  nickname: string;
  display_name: string;
  league: string;
  conference?: string;
  division: string;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: number;
    email: string;
    apiKey: string;
  };
}
