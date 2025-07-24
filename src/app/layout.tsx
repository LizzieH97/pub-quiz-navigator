import { Chewy, Courier_Prime, Schoolbell } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-schoolbell",
});

// ✅ you CAN export metadata now
export const metadata = {
  title: "Pub Quiz Navigator",
  description: "Find your next pub quiz!",
  icons: {
    icon: "/background.png",
  },
};

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
        <Footer />
      </body>
    </html>
  );
}
