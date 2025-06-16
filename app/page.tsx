import { prisma } from "@/lib/prisma";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCreators from "@/components/home/FeaturedCreators";
import MainCategories from '@/components/home/MainCategories';
import HowItWorks from '@/components/home/HowItWorks';
import CallToAction from '@/components/home/CallToAction';
import HeroCarousel from '@/components/home/HeroCarousel';
import { Product, User } from "@prisma/client";
import Image from 'next/image';
import SectionNavigationButtons from '@/components/home/SectionNavigationButtons';
import CreatorCarousel from '@/components/home/CreatorCarousel';
import HomeCtaNav from '@/components/home/HomeCtaNav';
import HomeSelectionCarousel from '@/components/home/HomeSelectionCarousel';

type ProductWithRelations = Product & {
  category: { name: string };
  shop: {
    name: string;
    user: {
      name: string | null;
      profile: {
        id: string;
        avatar: string | null;
        bio: string | null;
        location: string | null;
        phoneNumber: string | null;
      } | null;
    };
  };
};

type CreatorWithRelations = {
  id: string;
  name: string | null;
  email: string;
  profile: {
    avatar: string | null;
    bio: string | null;
  } | null;
  shop: {
    name: string;
  } | null;
};

export default function HomePage() {
  return (
    <main className="bg-neutral-500 min-h-screen">
      {/* Header minimal, logo centré, liens à gauche/droite */}
      {/* <header className="w-full flex items-center justify-between px-8 py-4 border-b border-black bg-neutral-500">
        <div className="flex items-center gap-8">
          <a href="#" className="font-bold text-lg" style={{fontFamily: 'Unbounded'}}>Ma boutique</a>
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-3xl font-unbounded font-bold text-neutral-900">Remade</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="font-bold text-base text-neutral-900">se connecter</a>
          <Image src="/REMADE/SVG/icône_personne.svg" alt="compte" width={28} height={28} />
          <span className="font-bold text-base text-neutral-900">favoris</span>
          <Image src="/REMADE/SVG/icône_coeur.svg" alt="favoris" width={28} height={28} />
        </div>
      </header> */}
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
