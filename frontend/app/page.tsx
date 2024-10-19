import Link from "next/link";
import OpenPack from "./components/OpenPack";

export default function Home() {
  return (
    <>
    <main>
    <h1>Home</h1>
    <Link href="/cards">Cards</Link>
    <OpenPack />
    <Link href="/pages">Pack Page</Link>
    </main>
    </>
  );
}
