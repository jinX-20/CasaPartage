import { Inter, Poppins, Inria_Sans } from "next/font/google";
const inriaSans = Inria_Sans({ subsets: ["latin"], weight: ["300", "400", "700"] }); // Light, Regular, Bold


import Navbar from "./components/Navbar"; 
import Header from "./components/Header"; 
import "./styles/globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#E5D3A0] bg-opacity-55">
        <Header />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

