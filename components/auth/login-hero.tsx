import Link from "next/link"

export function LoginHero() {
  return (
    <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-upcycle-purple/90 via-upcycle-teal/80 to-upcycle-mustard/70" />
      
      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 text-4xl animate-float opacity-30">
        ✂️
      </div>
      <div className="absolute bottom-20 right-10 text-4xl animate-pulse-slow opacity-40">
        👕
      </div>
      <div className="absolute top-1/3 right-20 text-4xl animate-bounce-slow opacity-30">
        🧵
      </div>

      {/* Contenu principal */}
      <div className="relative z-20 space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">
            Donnez une <span className="font-handwriting text-upcycle-mustard">nouvelle vie</span> à vos vêtements
          </h2>
          <p className="text-lg text-white/90">
            Rejoignez notre communauté de créateurs et transformez vos vêtements en pièces uniques
          </p>
        </div>

        {/* Image flottante */}
        <div className="relative h-[400px] w-full">
          <div className="absolute -top-4 -left-4 h-full w-full animate-float">
            <img 
              src="https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" 
              alt="Créateur travaillant sur un vêtement" 
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-upcycle-teal z-0 animate-pulse-slow opacity-80"></div>
          <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-upcycle-mustard z-0 animate-pulse-slow opacity-60"></div>
        </div>

        {/* Témoignage */}
        <blockquote className="space-y-2">
          <p className="text-lg">
            "UpCycle m'a permis de transformer ma passion pour la mode en une activité créative et durable."
          </p>
          <footer className="text-sm font-handwriting">Sofia Davis, Créatrice</footer>
        </blockquote>
      </div>
    </div>
  )
} 