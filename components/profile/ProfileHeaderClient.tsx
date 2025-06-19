"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileHeaderClient({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  function handleEditClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-primary w-full flex items-center px-8 py-8 shadow-lg">
        <div className="relative">
          {user.profile?.avatar ? (
            <Image src={user.profile.avatar} alt="Avatar" width={120} height={120} className="rounded-full border-4 border-white shadow-lg bg-white" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-neutral-300 flex items-center justify-center border-4 border-white text-4xl font-unbounded text-neutral-700 shadow-lg">
              {user.name?.[0] || user.email[0]}
            </div>
          )}
        </div>
        <div className="ml-8 flex-1 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-unbounded font-bold text-white">{user.name || 'Utilisateur'}</h1>
            <p className="text-neutral-100">{user.email}</p>
            <span className="text-sm text-neutral-200">Rôle : {user.role}</span>
          </div>
          <Button onClick={handleEditClick} className="mt-4 md:mt-0 border-2 border-white text-white font-unbounded rounded-md hover:bg-white hover:text-primary transition text-base bg-primary">Éditer le profil</Button>
        </div>
      </header>
      {open && <EditProfileModal user={user} onClose={handleClose} />}
    </>
  );
} 