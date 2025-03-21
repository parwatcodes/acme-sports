import { Route as IRoute } from './interfaces'

export const Leagues = [
  "NFL",
  "NHL",
  "UFL",
  "MLB",
  "NCAAB",
  "NCAAF",
  "USFL",
];

export const RoutesForLeague: IRoute[] = [
  { name: "Home", link: "/home" },
  { name: "Draft", link: "/draft/news" },
  { name: "Scores", link: "/scoreboard" },
  { name: "Schedule", link: "/schedule" },
  { name: "Standings", link: "/standings" },
  { name: "Stats", link: "/stats" },
  { name: "Teams", link: "/teams" },
  { name: "More...", link: "/more" },
];

export const ValidSortFields = ["name", "conference", "division"];
