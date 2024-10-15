import React, { useEffect, useState } from "react";
import { Table, Button, Space, Image, Modal, message,Popconfirm } from "antd";
import Edit from "../components/products/edit";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageWidth, setImageWidth] = useState(
    window.innerWidth >= 768 ? 150 : 50
  );

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setImageWidth(window.innerWidth >= 768 ? 100 : 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditingProduct(productToEdit);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedProduct) => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedProduct,
        price: parseFloat(updatedProduct.price),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        if (text) {
          const data = JSON.parse(text);
          message.success("Product updated successfully!");
        }
        //reload
        return fetch(process.env.REACT_APP_SERVER_URL + "/api/products");
      })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsEditModalOpen(false); 
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        message.error("Failed to update product.");
      });
  };

  const handleDelete = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/api/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        message.success("Product Deleted!");
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Img",
      dataIndex: "img",
      key: "img",
      render: (img) => <Image width={imageWidth} src={img} alt="not found" />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₺${price}`,
    },
    {
      title: "Cat.",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,

      render: (_, record) => (
        <div size="middle">
          <Button
            type="link"
            onClick={() => {
              handleEdit(record.id);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            okText="Yes"
            onConfirm={() => handleDelete(record.id)}
            cancelText="No"
          >
            <Button type="link" danger >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Products</h1>
        <div className="h-screen overflow-x-auto md:pb-52 pb-16">
          <Table
            className="custom-table"
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={products}
            bordered
            pagination={{
              pageSize: 50,
            }}
            scroll={{ x: "100%" }}
          />
        </div>
      </div>

      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {editingProduct && (
          <Edit
            product={editingProduct} 
            onClose={handleCancel}
            onUpdate={handleUpdate}
          />
        )}
      </Modal>
    </>
  );
};

export default ProductsPage;
