import React, { memo } from "react";
import trash from "@/static/trash.svg";
import { useSetRecoilState } from "recoil";
import { cartState } from "@/state";
import Button from "@/components/button";
import { motion } from "framer-motion";

type Props = {
  item: CartItem;
};

const CartItem = memo(({ item }: Props) => {
  const setCart = useSetRecoilState(cartState);

  const removeItem = () => {
    setCart((prev) => prev.filter((i) => i.id !== item.id));
  };

  const increaseQuantity = () => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = () => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === item.id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

  return (
    <div className="flex items-center justify-between mb-4 gap-2">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-12 h-12 rounded"
      />
      <div className="flex-1 ">
        <h2 className="text-sm font-semibold line-clamp-1">
          {item.product.title}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-green-500 text-sm font-bold">
            {item.product.price}{" "}
            <span className="text-black font-normal">x {item.quantity}</span>
          </p>
          <div className="flex items-center space-x-2">
            <Button className=" " onClick={decreaseQuantity} small>
              -
            </Button>
            <Button
              className=" rounded"
              onClick={increaseQuantity}
              small
              primary
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <motion.button
        onClick={removeItem}
        whileHover={{ scale: 1.1 }}
        className="rounded-xl text-sm font-medium text-white"
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <img src={trash} alt="cart" className="w-5 h-5" />
      </motion.button>
    </div>
  );
});

export default CartItem;
