import Navbar from "./components/Navbar"; 
import Header from "./components/Header"; 
import "./styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-[#E5D3A0] bg-opacity-55">
        <Header />
        <Navbar />
        <main>{children}</main>
      </div>
  );
}