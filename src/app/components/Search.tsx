"use client";

export default function Search({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search teams..."
      className=" p-3 w-2/5 border border-gray-300 rounded-full shadow-sm text-gray-700 focus:outline-none transition"
    />
  );
}
