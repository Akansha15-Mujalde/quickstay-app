import React, { useState, useEffect } from "react";
import { Search, MapPin, SlidersHorizontal, Star } from "lucide-react";

const Explore = ({ setPage, setSelectedHotel }) => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Database se hotels fetch karne ke liye useEffect hook
  useEffect(() => {
    fetch("http://localhost:5000/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Explore page fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Search filter logic (City ya Hotel name ke liye)
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 pt-28 px-6 max-w-7xl mx-auto">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Explore Luxury Horizons
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Discover premium stays matching your lifestyle filter.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search destination or hotel..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:border-indigo-500 text-slate-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-400 hover:text-white transition cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hotel Cards Grid Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-medium tracking-wide animate-pulse">
          Loading luxury catalog from database...
        </div>
      ) : filteredHotels.length === 0 ? (
        <div className="text-center py-20 text-slate-500 font-medium">
          No premium properties found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                <img
                  src={
                    hotel.image ||
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-indigo-400 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-800">
                  {hotel.category || "Premium Stay"}
                </span>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white group-hover:text-indigo-400 transition line-clamp-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded text-amber-400 text-xs font-bold shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" />{" "}
                    {hotel.rating || "4.8"}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                  <MapPin className="w-3 h-3 text-slate-500" /> {hotel.location}
                </div>
                <div className="flex justify-between items-center border-t border-slate-800/60 pt-4">
                  <span className="text-lg font-black text-white">
                    ₹
                    {hotel.price
                      ? hotel.price.toLocaleString("en-IN")
                      : "5,000"}
                    <span className="text-xs text-slate-500 font-medium">
                      /night
                    </span>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setPage("booknow");
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
