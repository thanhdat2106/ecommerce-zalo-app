import React, { memo } from "react";
import { motion } from "framer-motion";
import tag from "@/static/tag.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
};

const Product = memo((props: Props) => {
  const { product } = props;
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative bg-white rounded-2xl p-4 border mb-2 shadow-md"
      key={product.id}
      initial={{ opacity: 0, y: 0 }} // Bắt đầu từ dưới
      whileInView={{ opacity: 1, y: 0 }} // Khi cuộn vào viewport
      viewport={{ once: true, amount: 0.1 }} // Kích hoạt một lần khi hiển thị 20%
      transition={{ duration: 0.5, ease: "easeOut" }} // Hiệu ứng mượt hơn
    >
      <div onClick={() => navigate(`/product-detail/${product.id}/false`)}>
        <div className="relative">
          <img
            alt={product.title}
            className="w-full rounded-lg h-[400px]"
            height="400"
            src={product.image}
            width="600"
          />
          <span className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded-full">
            <img src={tag} alt="tag" className="inline-block w-4 h-4 mr-1" />
            {product.category}
          </span>
        </div>
        <h2 className="text-lg font-bold mt-4">{product.title}</h2>
        <p className="text-gray-600 mt-2">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
      </div>
      <div className="relative flex justify-between items-center mt-4 bg-[#D4EBD9] p-4 rounded-lg">
        <span className="text-primary font-bold text-lg">
          {product.price} $
        </span>
        <motion.button
          className="bg-white rounded-full font-bold px-4 py-2 z-10"
          onClick={() => navigate(`/product-detail/${product.id}/true`)}
          whileHover={{ scale: 1.1 }} // Phóng to nhẹ khi hover
          whileTap={{ scale: 0.9 }} // Nhấn xuống thì nhỏ lại
        >
          Buy now
        </motion.button>
      </div>
    </motion.div>
  );
});

export default Product;
