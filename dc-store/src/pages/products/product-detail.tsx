import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "@/apis/product.api";
import tag from "@/static/tag.svg";
import star from "@/static/star.svg";
import cart from "@/static/cart.svg";
import Button from "@/components/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  cartState,
  getProductInCartState,
  totalQuantityState,
  visibleCartState,
} from "@/state";
import { v4 as uuidv4 } from "uuid";
import Cart from "../cart";
import { useQuery } from "@tanstack/react-query";
import SkeletonProductDetail from "@/components/skeletonProductDetail";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id, isBuyNow } = useParams();
  let check = isBuyNow === "true";
  const [isBuy, setIsBuy] = useState<boolean>(check);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <SkeletonProductDetail />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <motion.div
      className="relative bg-gray-100 rounded-lg shadow-lg h-full max-h-full min-h-[650px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative bg-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={product.image}
          alt={`Product image of ${product.title}`}
          className="w-[80%] h-[500px] rounded-t-lg mx-auto"
        />
        <span className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded-full">
          <img src={tag} alt="tag" className="inline-block w-4 h-4 mr-1" />
          {product.category}
        </span>
      </motion.div>

      <motion.div
        className="absolute top-1/3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className=" relative py-4 border rounded-2xl bg-white w-11/12 mx-auto">
          <h2 className="px-4 text-lg font-semibold">{product.title}</h2>
          <div className="flex items-center justify-between mt-2 bg-[#D4EBD9] p-4">
            <div>
              <span className="text-gray-500 text-sm">Giá Tiền</span>
              <p className="text-green-600 text-lg font-bold">
                {product.price} $
              </p>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full">
              <img src={star} alt="star" className="w-4 h-4" />
              <span className="text-sm font-semibold px-2 py-1 rounded-full">
                {product.rating?.rate}
              </span>
            </div>
          </div>
          <div className="px-4 mt-4">
            <div className="border p-2 rounded-lg">
              <h3 className="text-gray-700 font-semibold">
                Product description
              </h3>
              <p
                className={`text-gray-600 text-sm mt-1 ${
                  !showFullDescription ? "line-clamp-3" : ""
                }`}
              >
                {product.description}
              </p>
              {product.description.length > 200 && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-green-600 text-2xs font-semibold mt-2"
                  >
                    {showFullDescription ? "Collapse <" : "See more >"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 p-4 bg-white rounded-t-lg shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CartComponent product={product} isBuy={isBuy} setIsBuy={setIsBuy} />
      </motion.div>
      <Cart />
    </motion.div>
  );
};

const CartComponent = memo(
  ({
    product,
    isBuy,
    setIsBuy,
  }: {
    product: Product;
    isBuy: boolean;
    setIsBuy: (isBuy: boolean) => void;
  }) => {
    const totalQuantity = useRecoilValue(totalQuantityState);
    const setCart = useSetRecoilState(cartState);
    const getProductInCart = useRecoilValue(getProductInCartState);
    const productInCart = getProductInCart(product.id);
    const setVisible = useSetRecoilState(visibleCartState);
    const handleAddToCart = () => {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          return prevCart.map((item) => {
            if (item.product.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          });
        }

        return [
          ...prevCart,
          {
            id: uuidv4(),
            product,
            options: {},
            quantity: 1,
          },
        ];
      });
    };
    const handleRemoveFromCart = () => {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        return updatedCart.filter((item) => item.quantity > 0);
      });
    };
    return (
      <>
        {totalQuantity > 0 && (
          <div className="fixed bottom-32 right-4 z-50 ">
            <div className="relative">
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
          </div>
        )}
        {isBuy || productInCart?.quantity ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-lg font-bold">
                {product.price} $
              </p>
            </div>
            <div className="flex items-center bg-white px-4 py-1 rounded-full h-12">
              <Button
                className="text-green-600 text-lg font-semibold border border-primary"
                onClick={() => {
                  handleRemoveFromCart();
                }}
                disabled={productInCart?.quantity === 0}
              >
                <span className="text-xl">-</span>
              </Button>
              <span className="text-lg font-semibold px-4 w-10">
                {productInCart?.quantity || 0}
              </span>
              <Button
                className="text-white text-lg font-semibold"
                primary
                onClick={() => {
                  handleAddToCart();
                }}
              >
                <span className="text-xl">+</span>
              </Button>
            </div>
          </div>
        ) : (
          <button
            className="w-full bg-green-600 text-white text-lg font-semibold py-2 rounded-lg h-12"
            onClick={() => setIsBuy(true)}
          >
            Buy now
          </button>
        )}
      </>
    );
  }
);
export default ProductDetail;
