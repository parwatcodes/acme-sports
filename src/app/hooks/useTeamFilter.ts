"use client";
import { useState, useEffect } from 'react'

import { Team } from '../utils/interfaces';

/**
 * Custom hook to filter and sort a list of teams.
 *
 * This hook provides functionality to:
 * - Sort teams by `name`, `conference`, or `division`.
 * - Group teams by `conference` or `division`.
 * - Return the filtered and sorted list of teams.
 *
 * @param teams - The initial list of teams to be filtered and sorted.
 *
 * @returns An object containing:
 * - `filteredTeams`: The filtered and sorted list of teams. If grouped, it returns a record where the keys are the group names.
 * - `sortBy`: The current sorting criteria (`name`, `conference`, or `division`).
 * - `setSortBy`: A function to update the sorting criteria.
 * - `groupBy`: The current grouping criteria (`none`, `conference`, or `division`).
 * - `setGroupBy`: A function to update the grouping criteria.
 */
export default function useTeamFilter(teams: any) {
  const [sortBy, setSortBy] = useState<"name" | "conference" | "division">("none");
  const [groupBy, setGroupBy] = useState<"none" | "conference" | "division">("none");
  const [filteredTeams, setFilteredTeams] = useState<Team[] | Record<string, Team[]>>(teams);

  useEffect(() => {
    let sortedTeams = [...teams];

    // Sorting
    sortedTeams.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

    // Grouping
    if (groupBy !== "none") {
      const grouped = sortedTeams.reduce((acc, team) => {
        const key = team[groupBy];
        acc[key] = acc[key] || [];
        acc[key].push(team);
        return acc;
      }, {} as Record<string, Team[]>);
      setFilteredTeams(grouped);
    } else {
      setFilteredTeams(sortedTeams);
    }
  }, [sortBy, groupBy]);

  return { filteredTeams, sortBy, setSortBy, groupBy, setGroupBy };
}
