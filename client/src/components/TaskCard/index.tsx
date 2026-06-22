import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="group mb-3 overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-900/80 dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-44 w-full object-cover"
        />
      )}
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Task #{task.id}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
              {task.title}
            </h3>
          </div>
          {task.status && (
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-white/10 dark:text-sky-200">
              {task.status}
            </span>
          )}
        </div>

        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {task.description || "No description provided"}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300">
            {task.priority || "No priority"}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300">
            {task.tags || "No tags"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Start
            </p>
            <p className="mt-1 font-medium text-slate-700 dark:text-slate-200">
              {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Due
            </p>
            <p className="mt-1 font-medium text-slate-700 dark:text-slate-200">
              {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm dark:border-white/10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Owner
            </p>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {task.author ? task.author.username : "Unknown"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Assignee
            </p>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {task.assignee ? task.assignee.username : "Unassigned"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
