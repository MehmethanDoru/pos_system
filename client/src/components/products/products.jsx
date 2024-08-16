import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./add";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import ProductItem from "./productItem";

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
      .catch((error) => console.error("Error fetching products:", error));
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
        <ProductItem key={product.id} product={product} />
      ))}

      <div
        className="product-item order hover:shadow-lg select-none bg-zinc-600 py-20 px-10 text-white cursor-pointer hover:bg-zinc-800 transition-all text-center self-center"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined style={{ fontSize: "52px" }} />
      </div>

      <Link
        to={"/products"}
        className="product-item order hover:shadow-lg select-none bg-zinc-600 py-20 px-10 text-white cursor-pointer hover:bg-zinc-800 transition-all text-center self-center"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined style={{ fontSize: "52px" }} />
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
