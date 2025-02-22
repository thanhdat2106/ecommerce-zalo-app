import { atom, selector } from "recoil";

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const getProductInCartState = selector({
  key: "getProductInCart",
  get: ({ get }) => {
    const cart = get(cartState);
    return (productId: number) => {
      return cart.find((item) => item.product.id === productId);
    };
  },
});
export const visibleCartState = atom<boolean>({
  key: "visibleCart",
  default: false,
});
