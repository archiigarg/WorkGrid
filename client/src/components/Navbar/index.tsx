import React from "react";
import { Menu, Search, Settings, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed, setIsDarkMode } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/70 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {!isSidebarCollapsed ? null : (
          <button
            aria-label="Open sidebar"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="relative hidden h-min w-[280px] md:flex">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500/40 dark:focus:bg-white/10"
            type="search"
            placeholder="Search projects, tasks, people"
          />
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          aria-label="Toggle dark mode"
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 cursor-pointer" />
          ) : (
            <Moon className="h-5 w-5 cursor-pointer" />
          )}
        </button>
        <Link
          href="/settings"
          className="ml-2 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <Settings className="h-5 w-5 cursor-pointer" />
        </Link>

        <div className="ml-3 mr-5 hidden min-h-[2em] w-px bg-slate-200 dark:bg-white/10 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
