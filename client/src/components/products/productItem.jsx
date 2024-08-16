import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  

  const handleClick = () => {
    dispatch(addProduct(product));
  };

  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div
        className="product-image"
        style={{
          height: "150px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.img}
          alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row px-2 justify-between">
          <div className="flex flex-col py-2">
            <span className="text-l font-bold">{product.title}</span>
            <p className="text-[10px] text-gray-700 mt-1">ID: {product.id}</p>
          </div>
          <span className="font-bold ms-[-20px] text-red-600 py-2">
            {product.price}₺
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
