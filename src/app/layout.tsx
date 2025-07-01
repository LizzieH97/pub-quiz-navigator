"use client";

import { Chewy, Courier_Prime, Schoolbell } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import { fetchPubs } from "../../lib/api";
import NavBar from "@/components/NavBar";

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-schoolbell",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pubs, setPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPubs = async () => {
      try {
        const data = await fetchPubs();
        setPubs(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPubs();
  }, []);
  return (
    <html lang="en">
      <body
        className={`
          ${schoolbell.variable}
          antialiased
        `}
      >
        <div
          className={`flex flex-col flex-wrap p-0 content-end font-schoolbell bg-bark`}
        >
          <Carousel pubs={pubs} />
          <NavBar />
        </div>

        {children}
      </body>
    </html>
  );
}
