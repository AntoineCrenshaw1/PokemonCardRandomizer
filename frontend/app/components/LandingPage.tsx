export default function LandingPage() {
  return (
    <div className="text-center">
      <h1>Welcome to my Pokemon Trading Card Pack Opening Simulator!</h1>
      <div className="grid grid-rows-auto gap-7 pt-6 p-5 ">
        <p>
          Once started, you will be presented with a pack that will contain all
          variant of pokemon cards, consumables, etc. The cards are randomly
          generated and the rarity of the cards are based on the real-life
          rarity of the cards.
        </p>
        <p>
          My goal is to continually add more features as time goes on. Features
          such as storing the cards in a collection to view later if user has an
          account, trading cards with other users, and more!
        </p>
        <p></p>
        <p>
          Disclaimer: The cards are generated from the Pokemon TCG API. The
          cards are not real and are only for simulation purposes.
        </p>
      </div>
    </div>
  );
}
