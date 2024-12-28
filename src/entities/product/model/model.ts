export interface Product {
  id: string;
  name: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
}
export interface SelectedQuantity {
  [key: string]: number;
}
