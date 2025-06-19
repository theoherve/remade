"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function EditProfileModal({ user, onClose }: { user: any, onClose: () => void }) {
  const [form, setForm] = useState({
    name: user.name || "",
    bio: user.profile?.bio || "",
    avatar: user.profile?.avatar || "",
    location: user.profile?.location || "",
    phoneNumber: user.profile?.phoneNumber || "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour du profil");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={handleOverlayClick}>
      <div className="bg-white border border-black rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-neutral-900 hover:text-black"><X size={24} /></button>
        <h2 className="text-2xl font-unbounded font-bold mb-6 text-neutral-900">Modifier mon profil</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-unbounded text-neutral-900">Nom
            <input name="name" value={form.name} onChange={handleChange} className="w-full mt-1 border border-black rounded px-3 py-2 font-unbounded" />
          </label>
          <label className="font-unbounded text-neutral-900">Bio
            <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full mt-1 border border-black rounded px-3 py-2 font-unbounded" />
          </label>
          <label className="font-unbounded text-neutral-900">Avatar (URL)
            <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full mt-1 border border-black rounded px-3 py-2 font-unbounded" />
          </label>
          <label className="font-unbounded text-neutral-900">Localisation
            <input name="location" value={form.location} onChange={handleChange} className="w-full mt-1 border border-black rounded px-3 py-2 font-unbounded" />
          </label>
          <label className="font-unbounded text-neutral-900">Téléphone
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full mt-1 border border-black rounded px-3 py-2 font-unbounded" />
          </label>
          <Button type="submit" className="mt-4 w-fit border-2 border-black text-neutral-900 font-unbounded rounded-md hover:bg-black hover:text-white transition text-base self-end" disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          {success && <div className="text-green-600 font-unbounded mt-2">Profil mis à jour !</div>}
          {error && <div className="text-red-600 font-unbounded mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
} 