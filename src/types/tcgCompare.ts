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
