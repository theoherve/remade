'use client';

import React from 'react';
import ProductDetail from '@/components/product/ProductDetail';

// Mock product data
const MOCK_PRODUCT = {
  id: '1',
  name: 'Veste en jean customisée',
  price: 89.99,
  description: 'Une veste en jean vintage transformée avec des motifs peints à la main et des détails brodés uniques. Chaque pièce est unique et éco-responsable.',
  story: 'Cette veste a été créée à partir d\'un jean vintage des années 90, trouvé dans une friperie locale. J\'ai passé plus de 20 heures à la customiser avec des broderies à la main et des patchs récupérés de vieux vêtements.',
  materials: ['Jean recyclé', 'Fils de coton bio', 'Patchs vintage'],
  images: [
    'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  ],
  category: 'Vestes',
  size: 'M',
  condition: 'Excellent état',
  isNew: true,
  isSustainable: true,
  creator: {
    id: '1',
    name: 'Sophie Martin',
    username: 'sophie.martin',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    pageSettings: {
      accentColor: '#9b87f5'
    }
  }
};

export default function ProductPage() {
  return (
    <ProductDetail product={MOCK_PRODUCT} />
  );
}
