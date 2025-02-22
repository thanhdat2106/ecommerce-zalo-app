type SelectedOptions = Record<string, string | string[]>;

interface CartItem {
  id: string;
  product: Product;
  options: SelectedOptions;
  quantity: number;
}

type Cart = CartItem[];
