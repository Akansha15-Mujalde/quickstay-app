import React, { useState } from "react";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import BookNow from "./pages/BookNow"; // Naya page import kiya

function App() {
  const [page, setPage] = useState("home");
  const [selectedHotel, setSelectedHotel] = useState(null); // Active hotel state tracker

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} setSelectedHotel={setSelectedHotel} />;
      case "explore":
        return (
          <Explore setPage={setPage} setSelectedHotel={setSelectedHotel} />
        );
      case "bookings":
        return <MyBookings />;
      case "login":
        return <Login setPage={setPage} />;
      case "booknow":
        return <BookNow hotel={selectedHotel} setPage={setPage} />;
      default:
        return <Home setPage={setPage} setSelectedHotel={setSelectedHotel} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      {/* Header Bar */}
      <header className="absolute top-0 left-0 w-full z-50 bg-slate-950/40 backdrop-blur-md border-b border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div
            className="text-xl font-black tracking-tight text-white flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setPage("home")}
          >
            <span className="text-indigo-400">⚡</span> QuickStay
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button
              onClick={() => setPage("home")}
              className={`transition cursor-pointer ${page === "home" ? "text-indigo-400" : "text-slate-400 hover:text-white"}`}
            >
              Home
            </button>
            <button
              onClick={() => setPage("explore")}
              className={`transition cursor-pointer ${page === "explore" ? "text-indigo-400" : "text-slate-400 hover:text-white"}`}
            >
              Explore
            </button>
            <button
              onClick={() => setPage("bookings")}
              className={`transition cursor-pointer ${page === "bookings" ? "text-indigo-400" : "text-slate-400 hover:text-white"}`}
            >
              My Bookings
            </button>
          </nav>

          <div>
            <button
              onClick={() => setPage("login")}
              className="bg-white/10 hover:bg-white text-white hover:text-slate-950 text-xs font-bold px-5 py-2.5 rounded-full transition border border-white/10 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="w-full">{renderPage()}</main>
    </div>
  );
}

export default App;
