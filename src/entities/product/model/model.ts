export interface Product {
  id: string;
  name: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail_img: string;
}
export interface SelectedQuantity {
  [key: string]: number;
}
