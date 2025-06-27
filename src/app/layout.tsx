// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import { Chewy, Courier_Prime, Schoolbell } from "next/font/google";
import "./globals.css";

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
});

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-schoolbell",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier",
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
        
          ${chewy.variable} 
          ${courier.variable} 
          ${schoolbell.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
