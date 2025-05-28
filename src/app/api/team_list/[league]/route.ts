import { NextResponse, type NextRequest } from 'next/server';

import { prisma } from '@/src/app/lib/prisma';
import { Leagues as ValidLeagues, ValidSortFields } from '@/src/app/utils/constant';

/**
 * Handle GET requests to fetch a list of teams based on the league and sorting field.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ league: string }> }) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const league =( await params).league
    const sort_by = searchParams.get('sort_by');

    if (!validateLeague(league)) {
      return NextResponse.json(
        {
          error: 'Please provide a valid league name to fetch team list.',
          description: 'invalid request',
        },
        { status: 400 }
      );
    }

    const sortField = getSortField(sort_by);

    const teams = await fetchTeams(league, sortField);

    return NextResponse.json({ data: teams, description: 'Successful operation' }, { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Error while fetching teams...' }, { status: 500 });
  }
}

/**
 * Validate the league parameter and ensure it is valid.
 */
function validateLeague(league: string): boolean {
  return !!(league && typeof league === 'string' && ValidLeagues.includes(league));
}

/**
 * Determine the sorting field, defaulting to 'name' if the provided field is invalid.
 */
function getSortField(sort_by: string | null): string {
  return ValidSortFields.includes(sort_by as string) ? sort_by as string : 'name';
}

/**
 * Fetch teams from the database based on the league and sorting field.
 */
async function fetchTeams(league: string, sortField: string) {
  return await prisma.team.findMany({
    where: { league },
    orderBy: { [sortField]: 'asc' },
  });
}
