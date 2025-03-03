import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
          Welcome to Antoine&apos;s Pokémon Trading Card Pack Opening Simulator
        </h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Experience the thrill of opening Pokémon card packs digitally. Each pack contains a variety of cards, including Pokémon, consumables, and more. Our sophisticated algorithm generates cards randomly, with rarity levels mirroring their real-world counterparts for an authentic experience.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            We&aps;re committed to enhancing your experience with regular updates. Planned features include:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Card collection storage for registered users</li>
              <li>Trading functionality between players</li>
              <li>Additional exciting features in development</li>
            </ul>
          </p>
          
          <p className="text-sm text-gray-500 italic">
            Disclaimer: This simulator uses data from the Pokémon TCG API. All cards are virtual and intended solely for entertainment purposes. No physical cards are distributed through this platform.
          </p>

          <div className="pt-4">
            <Link href="/cards">
              <button className="w-full px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Click Here to Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}