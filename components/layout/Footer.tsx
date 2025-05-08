'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">UpCycle</h3>
            <p className="text-gray-600">
              Donnez une seconde vie à vos vêtements préférés.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-gray-600 hover:text-upcycle-purple">
                  Explorer
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-gray-600 hover:text-upcycle-purple">
                  Créateurs
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-600 hover:text-upcycle-purple">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">À propos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-upcycle-purple">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-upcycle-purple">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-upcycle-purple">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Rejoignez-nous</h4>
            <p className="text-gray-600 mb-4">
              Inscrivez-vous pour recevoir nos dernières actualités et offres.
            </p>
            <Button className="w-full bg-upcycle-purple hover:bg-upcycle-purple/90">
              S'inscrire
            </Button>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} UpCycle. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}