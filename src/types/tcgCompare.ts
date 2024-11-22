export interface Category {
  id: number;
  game: {
    id: number;
    name: string;
    slug: string;
    image_path: string;
  };
  name: string;
  slug: string;
  image_path: string;
  product_count: number;
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  image_path: string;
}

export interface SubCategory {
  id: number;
  game: {
    id: number;
    name: string;
    slug: string;
    image_path: string;
  };
  name: string;
  slug: string;
  meta: {
    series: string;
    released_at: string;
    total_cards: number;
    pokemon_tcg_online_code: string | null;
  };
  description: string;
  image_path: string;
  product_count: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sub_category: SubCategory | null;
  category: {
    name: string;
    slug: string;
    image_path: string;
  };
  game: {
    name: string;
    slug: string;
    image_path: string;
  };
  image_path: string;
  created_at: string;
  country: {
    code: string;
    short_code: string;
    currency_code: string;
    currency_symbol: string;
    name: string;
    flag: string;
  };
  in_stock: boolean;
  price: number;
  average: number;
}
