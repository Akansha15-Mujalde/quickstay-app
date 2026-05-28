import React from "react";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  // Destructure hotel data safely
  const { _id, name, location, price, rating, images, type } = hotel;

  // Fallback image agar data me image na ho
  const displayImage =
    images && images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80";

  return (
    <Link
      to={`/hotel/${_id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Tag like 'Luxury', 'Resort', etc. */}
        {type && (
          <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">
            {type}
          </span>
        )}
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          {/* Title & Rating */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-sm font-bold">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              {rating || "4.5"}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Price Tag */}
        <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-baseline">
          <span className="text-xs font-medium text-slate-400">
            Price per night
          </span>
          <div className="text-slate-900">
            <span className="text-xl font-black">
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
