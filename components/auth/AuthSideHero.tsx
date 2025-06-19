import Image from "next/image";

export default function AuthSideHero() {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center relative bg-neutral-500">
      <Image src="/REMADE/background-remade.png" alt="Background Remade" fill className="absolute inset-0 object-cover" priority />

      <div className="relative z-10 px-4 py-12 w-full max-w-xl flex flex-col justify-center items-start">
        <h2 className="text-4xl font-unbounded font-bold mb-4 text-neutral-500">La mode qui a du sens</h2>
        <p className="text-lg font-unbounded mb-12 text-neutral-500">Donnez une seconde vie aux vêtements, soutenez des créateurs passionnés, consommez autrement.</p>
        <blockquote className="mb-2">
          <p className="text-base text-neutral-500 font-unbounded">"Remade m'a permis de transformer ma passion pour la mode en une activité créative et durable."</p>
          <footer className="text-sm italic text-neutral-500 mt-2">Sofia Davis, Créatrice</footer>
        </blockquote>
      </div>
    </div>
  );
} 