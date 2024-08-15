import { Button, Form, Input, Select, message } from "antd";
import React, { useState, useEffect } from "react";

const Edit = ({ product, onClose, onUpdate }) => {
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

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const handleFinish = (values) => {
    onUpdate({ ...product, ...values });
    message.success("Product updated successfully!");
    onClose();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item label="ID" name="id">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Product Name" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Price" name="price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Image URL" name="img" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
        <Select placeholder="Select a category">
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
      <div className="flex justify-end mt-4">
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </div>
      </Form.Item>
    </Form>
  );
};

export default Edit;
