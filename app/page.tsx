'use client';

import MainCategories from '@/components/home/MainCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FeaturedCreators from '@/components/home/FeaturedCreators';
import HowItWorks from '@/components/home/HowItWorks';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <>
      <MainCategories />
      <FeaturedProducts />
      <FeaturedCreators />
      <HowItWorks />
      <CallToAction />
    </>
  );
}
