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
