import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./add";
import Edit from "./edit";
import { message, Modal } from 'antd';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchCategories = () => {
    fetch("http://localhost:8080/api/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = (id, newName) => {
    fetch(`http://localhost:8080/api/categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name: newName }),
    })
      .then(() =>{ fetchCategories();
        message.success("Category Updated!");
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/categories`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    .then(() => {
      fetchCategories();
      message.success("Category Deleted!");
    })
    .catch((error) => console.error("Error deleting category:", error));
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <ul className="flex md:flex-col gap-6">
        <li 
          className={`py-8 px-10 text-white cursor-pointer transition-all text-center ${
            selectedCategory === "All" ? "bg-rose-500" : "bg-green-600 hover:bg-rose-500"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          <span>All</span>
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`py-8 px-10 text-white cursor-pointer transition-all text-center ${
              selectedCategory === category.name ? "bg-rose-500" : "bg-green-600 hover:bg-rose-500"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <span>{category.name}</span>
          </li>
        ))}
        <li
          className="bg-zinc-600 py-8 px-10 text-white cursor-pointer hover:bg-zinc-800 transition-all text-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <span>
            <PlusOutlined style={{ fontSize: "24px" }} />
          </span>
        </li>
        <li
          className="bg-zinc-600 py-8 px-10 text-white cursor-pointer hover:bg-zinc-800 transition-all text-center"
          onClick={() => setIsEditModalOpen(true)}
        >
          <span>
            <EditOutlined style={{ fontSize: "24px" }} />
          </span>
        </li>
      </ul>

      <Modal title="Add Category" open={isAddModalOpen} onCancel={handleCancel} footer={null} >
        <Add onClose={() => {
          handleCancel();
          fetchCategories();
        }}/>
      </Modal>

      <Modal title="Edit Categories" open={isEditModalOpen} onCancel={handleCancel} footer={null}>
        <Edit
          categories={categories}
          onClose={handleCancel}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Modal>

    </div>
  );
};

export default Categories;
