'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="bg-neutral-500 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-neutral-900">Remade</h3>
            <p className="text-neutral-900">
              Donnez une seconde vie à vos vêtements préférés.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neutral-900">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-neutral-900 hover:text-primary">
                  Explorer
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-neutral-900 hover:text-primary">
                  Créateurs
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-neutral-900 hover:text-primary">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neutral-900">À propos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-neutral-900 hover:text-primary">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-neutral-900 hover:text-primary">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-900 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neutral-900">Rejoignez-nous</h4>
            <p className="text-neutral-900 mb-4">
              Inscrivez-vous pour recevoir nos dernières actualités et offres.
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              S'inscrire
            </Button>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-neutral-900">
          <p>&copy; {new Date().getFullYear()} Remade. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}