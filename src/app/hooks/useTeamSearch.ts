import { useState, useMemo } from "react";
import { Team as ITeam } from "@/src/app/utils/interfaces";

/**
 * Custom hook for searching teams by name, nickname, conference, or division.
 *
 * This hook provides functionality to:
 * - Search through a list of teams (array or grouped object).
 * - Filter teams based on a search query.
 * - Return the filtered list of teams or grouped teams.
 *
 * @param teams - The list of teams to search. Can be an array (`ITeam[]`) or a grouped object (`Record<string, ITeam[]>`).
 *
 * @returns An object containing:
 * - `searchQuery`: The current search query string.
 * - `setSearchQuery`: A function to update the search query.
 * - `searchedTeams`: The filtered list of teams. If `teams` is grouped, it returns a grouped object with filtered results.
 */
export default function useTeamSearch(teams: ITeam[] | Record<string, ITeam[]>) {
  const [searchQuery, setSearchQuery] = useState("");

  const searchedTeams = useMemo(() => {
    if (!searchQuery) return teams;

    const filterTeam = (team: ITeam) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.conference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.division?.toLowerCase().includes(searchQuery.toLowerCase());

    if (Array.isArray(teams)) {
      // If `teams` is an array, filter directly
      return teams.filter(filterTeam);
    } else {
      // If `teams` is an object (grouped by division/conference), filter each group
      const filteredGroups: Record<string, ITeam[]> = {};
      Object.keys(teams).forEach((key) => {
        const filtered = teams[key].filter(filterTeam);
        if (filtered.length > 0) {
          filteredGroups[key] = filtered;
        }
      });
      return filteredGroups;
    }
  }, [teams, searchQuery]);

  return { searchQuery, setSearchQuery, searchedTeams };
}
