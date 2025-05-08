import React from 'react';
import { CheckCircle2, Recycle, Palette, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Récupération',
    description: 'Les créateurs sélectionnent des vêtements usagés ou neufs de qualité.',
    icon: Recycle,
    color: 'upcycle-teal'
  },
  {
    title: 'Création',
    description: 'Le vêtement est transformé en une pièce unique selon la vision du créateur.',
    icon: Palette,
    color: 'upcycle-purple'
  },
  {
    title: 'Vente',
    description: 'La création est mise en vente sur une page personnalisée par le créateur.',
    icon: ShoppingBag,
    color: 'upcycle-mustard'
  },
  {
    title: 'Impact',
    description: 'Vous obtenez une pièce unique tout en soutenant la mode durable.',
    icon: CheckCircle2,
    color: 'upcycle-coral'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Comment ça fonctionne</h2>
          <p className="text-gray-600">
            UpCycle favorise l&apos;économie circulaire dans la mode en permettant aux créateurs de transformer des vêtements en pièces uniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%-8px)] w-full h-[2px] bg-gray-200 z-0"></div>
              )}
              
              <div className="bg-white rounded-lg p-6 shadow-md relative z-10">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto",
                  `bg-${step.color}/20 text-${step.color}`
                )}>
                  <step.icon size={32} className={`text-upcycle-${step.color}`} />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
