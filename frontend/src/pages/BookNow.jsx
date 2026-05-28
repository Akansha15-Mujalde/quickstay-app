import React, { useState } from "react";
import {
  Calendar,
  Users,
  CreditCard,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

const BookNow = ({ hotel, setPage }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [booked, setBooked] = useState(false);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        No hotel selected.{" "}
        <button
          onClick={() => setPage("explore")}
          className="text-indigo-400 ml-2 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const basePrice = hotel.price || 4999;
  const tax = Math.round(basePrice * 0.18); // 18% GST
  const total = basePrice + tax;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBooked(true);
    // Yahan aage jaakar backend API hit hogi booking save karne ke liye
  };

  if (booked) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Your stay at{" "}
            <span className="text-indigo-400 font-bold">{hotel.name}</span> has
            been locked in.
          </p>
          <button
            onClick={() => setPage("bookings")}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-sm transition cursor-pointer"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 pt-28 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Left Column: Form Info */}
      <div className="md:col-span-2 space-y-6">
        <button
          onClick={() => setPage("explore")}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </button>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl font-black text-white mb-6">
            Secure Your Luxury Stay
          </h2>

          <form onSubmit={handleConfirmBooking} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Check-In Date
                </label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:border-indigo-500 text-slate-200"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests (Extra Bed)</option>
                <option value="4">4 Guests max</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-4 rounded-xl text-sm transition shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" /> Pay & Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Price Breakup Sidebar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit space-y-6">
        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-800">
          <img
            src={
              hotel.image ||
              "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
            }
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white leading-tight">
            {hotel.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{hotel.location}</p>
        </div>

        <div className="border-t border-slate-800 pt-4 space-y-3">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400">Room charge (1 Night)</span>
            <span className="text-white">
              ₹{basePrice.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400">GST & Luxury Tax (18%)</span>
            <span className="text-white">₹{tax.toLocaleString("en-IN")}</span>
          </div>
          <div className="border-t border-slate-800 pt-3 flex justify-between items-end">
            <span className="text-xs font-bold text-slate-400">
              Total Amount
            </span>
            <span className="text-xl font-black text-indigo-400">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
