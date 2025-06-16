import React from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
}

interface MegaMenuProps {
  categories: Category[];
  categoryIcons: { [key: string]: string };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ categories, categoryIcons, onMouseEnter, onMouseLeave }) => {
  // Répartir les catégories en 4 colonnes
  const columns = 4;
  const colCategories: Category[][] = Array.from({ length: columns }, () => []);
  categories.forEach((cat, i) => {
    colCategories[i % columns].push(cat);
  });

  return (
    <div
      className="fixed left-0 right-0 top-[72px] w-screen bg-neutral-500 border-b shadow-lg z-40 py-8 px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
        {colCategories.map((cats, colIdx) => (
          <div key={colIdx} className="flex flex-col space-y-2">
            {cats.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex items-center space-x-2 text-neutral-900 hover:text-primary transition"
              >
                <span className="text-2xl">{categoryIcons[category.name] || '🏷️'}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu; 