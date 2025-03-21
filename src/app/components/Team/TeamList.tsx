"use client";

import Team from "./Team";
import Search from "../Search";
import Filter from "./../Filter";
import { Team as ITeam } from "../../utils/interfaces";

import useTeamFilter from "@/src/app/hooks/useTeamFilter";
import useTeamSearch from "@/src/app/hooks/useTeamSearch";


interface TeamListProps {
  teams: ITeam[];
}

export default function TeamList(props: TeamListProps) {
  const { filteredTeams, sortBy, setSortBy, groupBy, setGroupBy } = useTeamFilter(props.teams);
  const { searchQuery, setSearchQuery, searchedTeams } = useTeamSearch(filteredTeams);

  return (
    <div className="container mx-auto m-4">
      <div className="flex justify-between items-center mb-10">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter sortBy={sortBy} setSortBy={setSortBy} groupBy={groupBy} setGroupBy={setGroupBy} />
      </div>
      {Array.isArray(searchedTeams) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {searchedTeams.map((team, index) => <Team key={index} team={team} />)}
        </div>
      ) : (
        Object.entries(searchedTeams).map(([group, teams]) => (
          <div key={group} className="my-10">
            <h2 className="text-4xl font-bold text-gray-800 my-8">{group} ({teams.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {teams.map((team) => <Team key={team.id} team={team} />)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
