"use client";

import { Chewy, Courier_Prime, Schoolbell } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import { fetchPubs } from "../lib/api";
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
          <NavBar />
        </div>

        {children}
      </body>
    </html>
  );
}
