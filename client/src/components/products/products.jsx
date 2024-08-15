import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./add";
import { Modal } from "antd";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProducts = () => {
    fetch("http://localhost:8080/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error withdrawing products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCancel = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <div className="products-wrapper grid grid-cols-card md:grid-cols-card-md gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-item order hover:shadow-lg cursor-pointer transition-all select-none"
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
              <div className="flex flex-col  py-2">
                <span className="text-l font-bold">{product.title}</span>
                <p className="text-[10px] text-gray-700 mt-1">
                  ID: {product.id}
                </p>
              </div>
              <span className="font-bold ms-[-20px] text-red-600 py-2">
                {product.price}₺
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="product-item order hover:shadow-lg select-none bg-zinc-600 py-20 px-10 text-white cursor-pointer hover:bg-zinc-800 transition-all text-center  self-center" onClick={() => setIsAddModalOpen(true)}>
        <span>
          <PlusOutlined style={{ fontSize: "52px" }} />
        </span>
      </div>
      <Link to={"/products"} className="product-item order hover:shadow-lg select-none bg-zinc-600 py-20 px-10 text-white cursor-pointer hover:bg-zinc-800 transition-all text-center  self-center" onClick={() => setIsEditModalOpen(true)}>
        <span>
          <EditOutlined style={{ fontSize: "52px" }} />
        </span>
      </Link>

      <Modal
        title="Add Product"
        open={isAddModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Add
          onClose={() => {
            handleCancel();
            fetchProducts();
          }}
        />
      </Modal>
    </div>
  );
};

export default Products;
