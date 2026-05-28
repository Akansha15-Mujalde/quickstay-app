import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Users, Search, Star } from "lucide-react";

const Home = ({ setPage, setSelectedHotel }) => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        // Safe check: Agar data backend se direct array na hokar kisi key ke andar ho
        const formattedData = Array.isArray(data) ? data : data.hotels || [];
        setHotels(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setLoading(false);
      });
  }, []);

  // 🔍 Real-Time Filter Logic
  const filteredHotels = hotels.filter((hotel) => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true; // Agar search box khali ho toh saare dikhao
    return (
      hotel.name?.toLowerCase().includes(term) ||
      hotel.location?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      {/* 1. HERO SECTION: Laptop View Coverage */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-center items-center text-white px-6 text-center bg-cover bg-center bg-no-repeat border-b border-slate-900"
        style={{
          backgroundImage: `url('/imgi_21_heroImage-C_C6vYe5.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/90 -z-10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto -mt-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight drop-shadow-md">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Perfect Stay
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium">
            Explore top-rated hotels, premium rooms, and elite stays instantly.
          </p>

          {/* Floating Search Bar */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-md text-slate-100 p-4 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-4 items-center border border-slate-800">
            <div className="flex items-center gap-3 w-full md:w-2/5 px-3 border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0">
              <MapPin className="text-indigo-400 w-5 h-5 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Where to?
                </label>
                <input
                  type="text"
                  placeholder="Search destinations or hotels..."
                  className="w-full text-sm font-semibold bg-transparent focus:outline-none placeholder-slate-500 text-slate-100 mt-0.5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-1/4 px-3 border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0">
              <Calendar className="text-indigo-400 w-5 h-5 shrink-0" />
              <div className="text-left">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Dates
                </label>
                <span className="text-sm font-semibold text-slate-300 block whitespace-nowrap cursor-pointer mt-0.5">
                  Add dates
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-1/4 px-3 pb-3 md:pb-0">
              <Users className="text-indigo-400 w-5 h-5 shrink-0" />
              <div className="text-left">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Guests
                </label>
                <span className="text-sm font-semibold text-slate-300 block whitespace-nowrap cursor-pointer mt-0.5">
                  Add guests
                </span>
              </div>
            </div>

            <button className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 active:scale-95 transition text-white px-8 py-3.5 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 shrink-0 cursor-pointer">
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Featured Properties
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Handpicked elite stays for an unforgettable experience.
            </p>
          </div>
          <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition cursor-pointer">
            View all →
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium tracking-wide animate-pulse">
            Loading luxury properties from database...
          </div>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="group bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                  <img
                    src={
                      hotel.image ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-indigo-400 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-800">
                    {hotel.category || "Premium Stays"}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition line-clamp-1">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-amber-400">
                        {hotel.rating || "4.5"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{hotel.location || "Location not provided"}</span>
                  </div>
                  <div className="border-t border-slate-800/60 my-4" />
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Price per night
                      </span>
                      <span className="text-lg font-black text-white">
                        ₹
                        {hotel.price
                          ? Number(hotel.price).toLocaleString("en-IN")
                          : "4,999"}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setPage("booknow");
                      }}
                      className="bg-slate-800 hover:bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500 font-medium">
            No active properties matching your search criteria.
          </div>
        )}
      </section>

      {/* 3. EXCLUSIVE OFFERS */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Exclusive Offers
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Take advantage of our limited-time offers and special packages.
            </p>
          </div>
          <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition cursor-pointer">
            View All Offers →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between p-6 relative">
            <span className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold px-3 py-1 rounded-md">
              25% OFF
            </span>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">
                Summer Escape Package
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enjoy a complimentary night and daily breakfast to make your
                summer absolute bliss.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-slate-800/60 pt-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Expires Aug 31
              </span>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition cursor-pointer">
                View Offers →
              </button>
            </div>
          </div>

          <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between p-6 relative">
            <span className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold px-3 py-1 rounded-md">
              20% OFF
            </span>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">
                Romantic Getaway
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Special couples package including full premium luxury spa
                treatments.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-slate-800/60 pt-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Expires Sep 20
              </span>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition cursor-pointer">
                View Offers →
              </button>
            </div>
          </div>

          <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between p-6 relative">
            <span className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold px-3 py-1 rounded-md">
              30% OFF
            </span>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">
                Luxury Retreat
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Book 60 days in advance and save on your premium elite stay at
                any of our luxury properties.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-slate-800/60 pt-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Expires Sep 25
              </span>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition cursor-pointer">
                View Offers →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT OUR GUESTS SAY */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            What Our Guests Say
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
            Discover why discerning travelers consistently choose QuickStay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
            <div className="text-amber-400 mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
              "I've used many booking platforms before, but none compare to the
              personalized experience and attention to detail that QuickStay
              provides."
            </p>
            <div className="flex items-center gap-3 border-t border-slate-800/40 pt-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 font-bold text-sm flex items-center justify-center">
                ER
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Emma Rodriguez</h4>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
            <div className="text-amber-400 mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
              "Every resort recommended here has been top notch. The user
              experience is completely elite and flawless."
            </p>
            <div className="flex items-center gap-3 border-t border-slate-800/40 pt-4">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 text-violet-400 font-bold text-sm flex items-center justify-center">
                LJ
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Liam Johnson</h4>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
            <div className="text-amber-400 mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
              "Saved me hours of research for my beach getaway. The UI dashboard
              is smooth and booking is blindingly fast."
            </p>
            <div className="flex items-center gap-3 border-t border-slate-800/40 pt-4">
              <div className="w-10 h-10 rounded-full bg-cyan-600/20 text-cyan-400 font-bold text-sm flex items-center justify-center">
                SL
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sophia Lee</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="relative bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 p-8 md:p-12 rounded-3xl text-center overflow-hidden shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
            Stay Inspired
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 font-medium">
            Join our newsletter and be the first to discover new destinations
            and exclusive offers.
          </p>

          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition text-white px-6 py-3 rounded-xl font-bold text-sm cursor-pointer shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="text-xl font-black text-white mb-4">
              ⚡ QuickStay
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Discover unparalleled luxury comfort across the world's most
              exclusive premium suites and resorts instantly.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-6 text-center text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} QuickStay. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
