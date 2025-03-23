export interface ProductSize {
  volume: string;
  multiplier: number;
}

export interface Product {
  _id: string;
  name: string;
  company: string;
  rating: number;
  number_votes: number;
  for_gender: string;
  main_accords: string[];
  description: string;
  season: string;
  image: string;
  price: number;
  selectedSize: string;
  sizes: ProductSize[];
  quantity: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
}
export interface CartItem {
  product: Product;
  // selectedSize: string;
  quantity: number;
}
export interface Cart {
  items: CartItem[];
}
