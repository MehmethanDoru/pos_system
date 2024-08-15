import { Button, Input, message } from "antd";
import React, { useState } from "react";

const Add = ({ onClose }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        message.success("Category created successfully!");
        setName(""); 
        onClose();
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Category Name"
        className="mt-2 mb-2 p-2"
        required="true"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <Button type="primary" key="add" size="medium" htmlType="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

export default Add;
