import React, { FC } from "react";
import logo from "@/static/Cover.png"; // Updated import path
import sun from "@/static/sun.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { totalQuantityState, visibleCartState } from "@/state";
import cart from "@/static/cart.svg";
type Props = {};

const Header = (props: Props) => {
  const totalQuantity = useRecoilValue(totalQuantityState);
  const setVisible = useSetRecoilState(visibleCartState);

  return (
    <div className="mb-6">
      <div
        className="absolute w-full h-48  mb-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${logo})` }}
      ></div>
      <div className="relative pt-14 text-lg ml-4 flex items-center justify-between">
        <div>
          <p>
            Good morning{" "}
            <img src={sun} alt="sun" className="inline-block w-5 h-5" />
          </p>
          <p className="text-2xl font-bold ">Nguyen Van B</p>
        </div>
        {totalQuantity > 0 && (
          <div className="relative mr-4">
            <img
              src={cart}
              alt="cart"
              className="w-12 h-12"
              onClick={() => setVisible(true)}
            />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {totalQuantity}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
