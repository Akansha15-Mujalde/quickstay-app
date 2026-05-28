import React from "react";
import { Calendar, CreditCard, Clock, CheckCircle } from "lucide-react";

const MyBookings = () => {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 pt-28 px-6 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white">
          My Bookings
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage and track your upcoming luxury itineraries.
        </p>
      </div>

      {/* Booking List Container */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500" />

          {/* Left Block: Image + Details Group */}
          <div className="flex flex-col sm:flex-row gap-5 items-start flex-1">
            {/* ✅ Real Unsplash Thumbnail Image */}
            <div className="w-20 h-20 rounded-xl shrink-0 overflow-hidden bg-slate-800 border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=150&q=80"
                alt="Oceanic Vista"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Texts and Badges */}
            <div>
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full mb-2">
                <CheckCircle className="w-3 h-3" /> Confirmed
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                Oceanic Vista Suite
              </h3>
              <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> 12 Jun - 15
                Jun (3 Nights)
              </p>
            </div>
          </div>

          {/* Right Block: Price + Manage Action Button */}
          <div className="flex flex-row md:flex-col justify-between items-end border-t md:border-t-0 border-slate-800/60 pt-4 md:pt-0 shrink-0 min-w-[120px]">
            <div className="text-left md:text-right">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Total Paid
              </span>
              <span className="text-xl font-black text-white">₹22,499</span>
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer mt-0 md:mt-4">
              Manage Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
