"use client";
import Link from "next/link";
import styled from "styled-components";
import LandingPage from "./components/LandingPage";

const Title = styled.button({
  textAlign: "center",
  display: "flex",
  fontSize: "2rem",
  text: "white",
  backgroundColor: "blue",
  padding: "1rem",
  borderRadius: "100px",
  marginTop: "3rem",
});

export default function Home() {
  return (
    <>
      <main>
        <LandingPage />
        <Link href="/cards">
          <Title className="pt-10 mx-auto">Click here to get started!</Title>
        </Link>
      </main>
    </>
  );
}
