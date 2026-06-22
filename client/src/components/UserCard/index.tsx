import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/80">
      {user.profilePictureUrl && (
        <Image
          src={`/p1.jpeg`}
          alt="profile picture"
          width={40}
          height={40}
          className="rounded-full ring-2 ring-white dark:ring-slate-900"
        />
      )}
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-950 dark:text-white">{user.username}</h3>
        <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
