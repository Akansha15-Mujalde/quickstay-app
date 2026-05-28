import React from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";

const Login = ({ setPage }) => {
  return (
    <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="text-2xl font-black tracking-tight text-white mb-2">
            ⚡ QuickStay
          </div>
          <p className="text-slate-400 text-xs font-medium">
            Welcome back! Sign in to access elite bookings.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage("home");
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <a
                href="#"
                className="text-[11px] font-bold text-indigo-400 hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-500">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-400 font-bold hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
