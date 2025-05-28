"use client";

import { Dispatch, SetStateAction } from "react";

export default function Filter({ sortBy, setSortBy, groupBy, setGroupBy }: {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<"name" | "conference" | "division" | "none">>
  groupBy: string;
  setGroupBy: Dispatch<SetStateAction<"conference" | "division" | "none">>
}) {

  const activeFiltersCount = () => {
    let count = 0;
    if (sortBy !== "none") count++;
    if (groupBy !== 'none') count++;

    if (count) return <span className="font-bold">({count})</span>;

  };
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <select
        className={`p-2 outline-none border rounded-md shadow-sm border-gray-300`}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "name" | "conference" | "division" | "none")}
      >
        <option value="none">Sort by</option>
        <option value="name">Name</option>
        <option value="conference">Conference</option>
        <option value="division">Division</option>
      </select>

      <select
        className={`p-2 border outline-none rounded-md shadow-sm border-gray-300`}
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value as "conference" | "division" | "none")}
      >
        <option value="none">Group by</option>
        <option value="conference">Conference</option>
        <option value="division">Division</option>
      </select>

      <button
        className="p-2 shadow-sm border rounded-md border-gray-400 bg-gray-50 text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer font-medium shadow-sm"
        onClick={() => {
          setSortBy("none");
          setGroupBy("none");
        }}
      >
        ❌ Clear Filters {activeFiltersCount()}
      </button>
    </div>
  );
}
