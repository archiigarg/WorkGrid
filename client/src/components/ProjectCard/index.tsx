import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Project
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
            {project.name}
          </h3>
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-white/10 dark:text-sky-200">
          Active
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {project.description || "No description provided"}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
        <div>
          <p className="text-xs uppercase tracking-[0.18em]">Start</p>
          <p className="mt-1 font-medium text-slate-700 dark:text-slate-200">{project.startDate || "Not set"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em]">End</p>
          <p className="mt-1 font-medium text-slate-700 dark:text-slate-200">{project.endDate || "Not set"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
