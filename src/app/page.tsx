import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen p-2 gap-4 sm:p-20 font-[family-name:var(--font-schoolbell)]">
      <main className="flex flex-col w-full items-center sm:items-start">
        <Header />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center">
        <p>
          Made by Lizzie 💕 I received no money from this, plz give me a job!!
        </p>
      </footer>
    </div>
  );
}
