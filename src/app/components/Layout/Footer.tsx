export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">ACME Sports</h2>
            <p className="text-gray-400 mt-2">&copy; {new Date().getFullYear()} ACME Sports. All rights reserved.</p>
          </div>

          <div className="mt-6 md:mt-0">
            <ul className="flex flex-wrap gap-6 justify-center">
              <li>
                <a href="/" className="text-gray-300 howver:text-green-400 transition">Home</a>
              </li>
              <li>
                <a href="/nfl/teams" className="text-gray-300 hover:text-green-400 transition">Teams</a>
              </li>
              <li>
                <a href="/schedule" className="text-gray-300 hover:text-green-400 transition">Schedule</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-green-400 transition">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
