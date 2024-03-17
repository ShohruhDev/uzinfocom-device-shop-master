export interface GoodEntity {
  id: string | number;
  model: string;
  category: string;
  retail_price: string | number;
  release_date: string;
  description: string;
  created_date: string;
  is_visible: boolean;
}
