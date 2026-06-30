"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  useEffect(() => {
    setSearchTerm(initialQuery);
    setQuery(initialQuery);
  }, [initialQuery]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
        <Header name="Search" />
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Search across tasks, projects, and people after entering at least 3 characters.
        </p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500/40 lg:w-1/2"
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            debouncedSearch(value);
          }}
        />
      </div>
      <div className="space-y-6">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2 className="mb-3 mt-8 text-lg font-semibold text-slate-950 dark:text-white">Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {searchResults.users && searchResults.users?.length > 0 && (
              <h2 className="mb-3 mt-8 text-lg font-semibold text-slate-950 dark:text-white">Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
