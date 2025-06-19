import HomeCtaNav from '@/components/home/HomeCtaNav';
import HomeSelectionCarousel from '@/components/home/HomeSelectionCarousel';

export default function HomePage() {
  return (
    <main className="bg-neutral-500 min-h-screen">
      {/* Section CTA navigation (4 boutons) */}
      <div className="hidden md:block">
        <HomeCtaNav />
      </div>
      {/* Section Remade orange */}
      <section className="w-full bg-primary flex items-center justify-center py-36">
        <h1 className="text-7xl md:text-8xl font-unbounded font-bold text-neutral-500">Remade</h1>
      </section>
      {/* Carousel sélection créateurs/promos */}
      <section className="container mx-auto py-12">
        <HomeSelectionCarousel />
      </section>
    </main>
  );
}
