import axios from "@/src/app/lib/axios";
import TeamList from "@/src/app/components/Team/TeamList";

export default async function Teams({ params }: { params: { league: string } }) {
  const league = params.league.toLocaleUpperCase();
  let data = [];
  let errorMessage = "";

  try {
    const res = await axios.get(`/team_list/${league}`);
    data = res.data.data;
  } catch (error: any) {
    console.error("Error fetching teams:", error.response?.data || error.message);
    errorMessage = error.response?.data?.error || "An unexpected error occurred while fetching teams.";
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-6xl font-bold">Error</h2>
        <p className="text-3xl text-gray-800 mt-4">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto m-8">
      {data.length ? (
        <>
          <h2 className="text-4xl font-bold my-4 text-gray-800 mb-6">
            {league} Teams ({data.length})
          </h2>
          <TeamList teams={data} />
        </>
      ) : (
        <div className="text-center text-gray-600 mt-10">
          <h2 className="text-2xl font-bold">No Data Available</h2>
          <p className="mt-2">We couldn't find any teams for the selected league.</p>
        </div>
      )}
    </div>
  );
}
