export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreState {
  cart: CartItem[];
  products: Product[];
}
