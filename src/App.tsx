import { useState } from "react";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import UsagePage from "./pages/Usage";
import Support from "./pages/Support";
import FleetPage from "./pages/Fleet";

type Tab = "overview" | "usage" | "support" | "fleet";

export default function App() {
  const [tab, setTab] = useState<Tab>("overview");

  const pages: Record<Tab, JSX.Element> = {
    overview: <Overview />,
    usage: <UsagePage />,
    support: <Support />,
    fleet: <FleetPage />,
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6]">
      <Navbar activeTab={tab} setTab={setTab} />
      <main className="max-w-6xl mx-auto px-5 py-5">
        {pages[tab]}
      </main>
    </div>
  );
}