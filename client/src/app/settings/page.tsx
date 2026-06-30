"use client";

import Header from "@/components/Header";
import { useGetAuthUserQuery } from "@/state/api";
import { fetchUserAttributes } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const { data: currentUser, isLoading, isError } = useGetAuthUserQuery({});
  const [email, setEmail] = useState("Unknown");

  useEffect(() => {
    const loadEmail = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setEmail(attributes.email ?? "Unknown");
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    loadEmail();
  }, []);

  const username =
    currentUser?.userDetails?.username ?? currentUser?.user?.username ?? "Unknown";

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-100";

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
          <Header name="Settings" />
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Loading account details...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
          <Header name="Settings" />
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Unable to load account details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
        <Header name="Settings" />
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Review the workspace identity and your account details.
        </p>
      </div>

      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/80">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{username}</div>
        </div>
        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{email}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
