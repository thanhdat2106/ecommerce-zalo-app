import React, { memo, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Sheet } from "zmp-ui";
import { cartState, visibleCartState } from "@/state";
import Button from "@/components/button";
import CartItem from "./cart-item";

const Cart = memo(() => {
  const visible = useRecoilValue(visibleCartState);
  const setVisible = useSetRecoilState(visibleCartState);
  const cart = useRecoilValue(cartState);

  // Tính tổng tiền
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">My Cart</h1>
        </div>

        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Hiển thị tổng tiền */}
            <div className="flex justify-between items-center mt-4 text-lg font-semibold">
              <span>Total:</span>
              <span className="text-green-600">
                {totalPrice.toLocaleString()} $
              </span>
            </div>

            <Button
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold mt-4"
              primary
              disabled={!cart.length}
            >
              Order
            </Button>
          </>
        ) : (
          <p className="text-center text-gray-500">Empty Cart</p>
        )}
      </div>
    </Sheet>
  );
});

export default Cart;
