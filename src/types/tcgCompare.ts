export interface Game {
  id: number;
  name: string;
  slug: string;
  image_path: string;
}

export interface Country {
  code: string;
  short_code: string;
  currency_code: string;
  currency_symbol: string;
  name: string;
  flag: string;
}

export interface Category {
  id: number;
  game: Game;
  name: string;
  slug: string;
  image_path: string;
  product_count: number;
}

export interface Meta {
  series: string;
  released_at: string;
  total_cards: number;
  pokemon_tcg_online_code: string | null;
}

export interface SubCategory {
  id: number;
  game: Game;
  name: string;
  slug: string;
  meta: Meta;
  description: string;
  image_path: string;
  product_count: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sub_category: SubCategory | null;
  category: Category;
  game: Game;
  image_path: string;
  created_at: string;
  country: Country;
  in_stock: boolean;
  price: number;
  average: number;
}

export interface Site {
  id: number;
  name: string;
  slug: string;
  image_path: string;
  base_url: string;
  country: string;
  discount_code: string | null;
  discount_description: string | null;
}

export interface Feedback {
  score: number;
  up: number;
  down: number;
}

export interface Price {
  id: number;
  site: Site;
  name: string;
  url: string;
  price: number;
  in_stock: number;
  visits: number;
  feedback: Feedback;
  created_at: string;
}
