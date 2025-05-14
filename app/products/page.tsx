import { searchProducts } from '@/lib/actions/product';
import ExploreClientPage from './ExploreClientPage';

export default async function ExplorePage() {
  const products = await searchProducts('');
  const categories = Array.from(new Set(products.map((p: any) => p.category.name)));
  return <ExploreClientPage products={products} categories={categories} />;
}
