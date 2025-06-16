import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Star } from 'lucide-react';

interface SectionNavigationButtonsProps {
  ctaStyle?: boolean;
}

const navButtons = [
  {
    label: 'Les Créateurs',
    href: '/creators',
    icon: <Image src="/REMADE/SVG/icône_personne.svg" alt="Les Créateurs" width={32} height={32} />,
  },
  {
    label: 'Les vêtements',
    href: '/products',
    icon: <ShoppingBag size={32} />,
  },
  {
    label: 'Les accessoires',
    href: '/products?category=accessoires',
    icon: <Star size={32} />,
  },
  {
    label: 'Rechercher',
    href: '/search',
    icon: <Search size={32} />,
  },
];

export default function SectionNavigationButtons({ ctaStyle = false }: SectionNavigationButtonsProps) {
  return (
    <nav className={`w-full flex justify-center ${ctaStyle ? 'bg-primary' : 'bg-background border-b py-4'}`}>
      <div className="flex flex-wrap gap-4 justify-center">
        {navButtons.map((btn) => (
          <Link href={btn.href} key={btn.label}>
            <Button
              variant={ctaStyle ? undefined : 'outline'}
              className={`flex flex-col items-center gap-2 px-6 py-4 min-w-[120px] font-unbounded text-base transition-all ${ctaStyle ? 'bg-background text-primary border-none shadow-md rounded-xl hover:bg-background/80 hover:scale-105' : ''}`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
} 