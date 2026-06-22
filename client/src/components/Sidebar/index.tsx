"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed z-40 flex h-full flex-col justify-between overflow-y-auto border-r border-slate-200/80 bg-white/90 shadow-[12px_0_48px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/85
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
  `;
  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* top logo */}
        <div className="z-50 flex min-h-[64px] w-64 items-center justify-between px-6 pt-4">
          <div className="flex items-center gap-3 text-xl font-semibold text-slate-900 dark:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500 text-sm font-bold text-white shadow-lg shadow-sky-500/25">
              W
            </span>
            <span>WorkGrid</span>
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* team */}
        <div className="mx-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/5">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
              Team Name
            </h3>
            <div className="mt-1 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
              <LockIcon className="mt-[0.1rem] h-3 w-3" />
              <p>Private workspace</p>
            </div>
          </div>
        </div>
        {/* Navbar links */}
        <nav className="z-10 mt-4 w-full space-y-1 px-3">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        {/* PROJECTS LINKS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="mt-4 flex w-full items-center justify-between px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
        >
          <span>Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

         {/* PROJECTS LIST */}
          {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}

         {/* PRIORITIES LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="mt-4 flex w-full items-center justify-between px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
        >
          <span>Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative mx-3 flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 transition-all hover:-translate-y-0.5 hover:bg-slate-100 dark:hover:bg-white/5 ${
          isActive
            ? "bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-white/10 dark:text-white dark:ring-white/10"
            : "text-slate-600 dark:text-slate-300"
        } justify-start`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-sky-500" />
        )}

        <Icon className="h-5 w-5" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
