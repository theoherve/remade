import { getCurrentUser } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import ProfileHeaderClient from '@/components/profile/ProfileHeaderClient';
import ProfileTabs from '@/components/profile/ProfileTabs';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  // Fake stats (à remplacer par vraies données)
  const stats = [
    { label: 'Favoris', value: 0, icon: '❤️', tabValue: 'favoris' },
    { label: 'Articles', value: 0, icon: '👗', tabValue: 'articles' },
    { label: 'Commandes', value: 0, icon: '🛒', tabValue: 'commandes' },
  ];

  return (
    <main className="bg-neutral-500 min-h-screen">
      {/* Header sticky Remade */}
      <ProfileHeaderClient user={user} />
      <ProfileTabs stats={stats} />
    </main>
  );
}

function StatCta({ label, value, icon, tabValue }: { label: string, value: number, icon: string, tabValue: string }) {
  function handleClick() {
    const tab = document.querySelector(`[data-state="active"]`);
    if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return (
    <button
      onClick={handleClick}
      className="flex-1 text-center py-5 px-2 text-lg md:text-xl font-unbounded font-bold border-black border-r last:border-r-0 hover:underline transition-all duration-700 cursor-pointer bg-white h-full flex flex-col items-center justify-center"
      style={{ minWidth: 0 }}
      type="button"
    >
      <span className="text-2xl mb-1">{icon} <span className="align-middle text-lg">{value}</span></span>
      <span className="block text-base mt-1">{label}</span>
    </button>
  );
} 