export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
  materials: string[];
  createdAt: string;
  creator: {
    name: string;
  };
}
