import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-upcycle-purple/20 to-upcycle-teal/10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt(e) à donner une nouvelle vie à la mode ?
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            Rejoignez notre communauté de créateurs et d'acheteurs engagés pour une mode plus responsable et unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-upcycle-purple hover:bg-upcycle-light-purple text-white" size="lg" asChild>
              <Link href={"/explore"}>Explorer les créations</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-upcycle-purple text-upcycle-purple hover:bg-upcycle-light-purple/20" asChild>
              <Link href={"/become-creator"}>Devenir créateur</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
