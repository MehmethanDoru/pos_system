import { Button, Form, Input, InputNumber, message, Select } from "antd";
import React, { useState, useEffect } from "react";

const Add = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm(); 

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories:", data); 
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);

    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        message.success("Product created successfully!");
        form.resetFields(); 
        onClose();
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Product Name"
        name="title"
        rules={[
          {
            required: true,
            message: "Product Name is required!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image Address"
        name="img"
        rules={[
          {
            required: true,
            message: "Image Address is required!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Price is required!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Category is required!",
          },
        ]}
      >
        <Select placeholder="Select a category">
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className="flex justify-end mt-4">
        <Button type="primary" key="add" size="medium" htmlType="submit">
          Add
        </Button>
      </div>
    </Form>
  );
};

export default Add;
