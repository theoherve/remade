import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-upcycle-purple/10 to-background py-16 md:py-24">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 sticker animate-float opacity-30">
        ✂️
      </div>
      <div className="absolute bottom-20 right-10 sticker animate-pulse-slow opacity-40">
        👕
      </div>
      <div className="absolute top-1/3 right-20 sticker animate-bounce-slow opacity-30">
        🧵
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Donnez une <span className="text-upcycle-purple font-handwriting">nouvelle vie</span> aux vêtements
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              UpCycle est la marketplace qui permet aux créateurs de transformer des vêtements usagés en pièces uniques et de les vendre directement aux amateurs de mode responsable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-upcycle" asChild>
                <Link href="/explore">Explorer les créations</Link>
              </Button>
              <Button variant="outline" className="border-upcycle-purple text-upcycle-purple hover:bg-upcycle-purple/10" asChild>
                <Link href="/become-creator">Devenir créateur</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" 
                alt="Créateur travaillant sur un vêtement" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 rounded-full bg-upcycle-teal z-0 animate-pulse-slow opacity-80"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 md:w-40 md:h-40 rounded-full bg-upcycle-mustard z-0 animate-pulse-slow opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
