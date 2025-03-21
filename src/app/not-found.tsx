export default function NotFoundPage() {

  return (
    <div className="flex flex-col items-center min-h-[60vh] justify-center text-center">
      <h1 className="text-8xl font-bold text-black-600">404</h1>
      <h2 className="text-3xl text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <a href="/nfl/teams" className="mt-6 px-6 py-3 bg-gray-500 text-white hover:bg-blue-600 transition">
        Go to Teams
      </a>
    </div>
  );
}
