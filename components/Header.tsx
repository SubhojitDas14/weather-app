"use client";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";

interface HeaderProps {
  session: Session | null;
  onSignOut: () => void;
}

export default function Header({ session, onSignOut }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism border-b border-slate-700/50 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">⛅</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Weather
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-slate-300">{session?.user?.name}</p>
            <p className="text-xs text-slate-500">{session?.user?.email}</p>
          </div>

          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-10 h-10 rounded-full border border-indigo-500/50"
            />
          )}

          <button
            onClick={() => onSignOut()}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 text-red-300 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
