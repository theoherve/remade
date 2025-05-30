'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";

const banners = [
  {
    title: "Tendances du moment",
    subtitle: "Découvrez les pièces les plus en vogue sélectionnées par notre équipe.",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    buttonText: "Voir la sélection",
    buttonLink: "/explore",
    bg: "bg-gradient-to-br from-upcycle-purple/20 to-background"
  },
  {
    title: "-20% sur une sélection",
    subtitle: "Profitez de nos offres exceptionnelles sur des créations uniques !",
    imageUrl: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=800&q=80",
    buttonText: "J'en profite",
    buttonLink: "/promos",
    bg: "bg-gradient-to-br from-upcycle-mustard/20 to-background"
  },
  {
    title: "Créateur de la semaine",
    subtitle: "Rencontrez Marion et découvrez ses dernières créations upcyclées.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    buttonText: "Découvrir Marion",
    buttonLink: "/creator/marion",
    bg: "bg-gradient-to-br from-upcycle-teal/20 to-background"
  }
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  // Défilement automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i === banners.length - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative overflow-hidden h-80 md:h-96 ${banners[index].bg}`}>
      <div className="container h-full flex flex-col md:flex-row items-center gap-8 py-4">
        <div className="flex-1 flex flex-col justify-center h-full text-center md:text-left space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{banners[index].title}</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4">{banners[index].subtitle}</p>
          <Link
            href={banners[index].buttonLink}
            className="inline-block w-auto bg-upcycle-purple text-white px-6 py-2 font-semibold hover:bg-upcycle-purple/80 transition self-center md:self-start"
          >
            {banners[index].buttonText}
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-center h-full">
          <img src={banners[index].imageUrl} alt={banners[index].title} className="shadow-lg w-full max-w-md h-48 md:h-72 object-cover" />
        </div>
      </div>
      {/* Indicateurs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-upcycle-purple' : 'bg-gray-300'} transition`}
            aria-label={`Aller à la bannière ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel; 