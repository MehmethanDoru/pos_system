import React, { useState } from 'react';
import { Select, Input, Button, Form, Popconfirm } from 'antd';

const Edit = ({ categories, onClose, onUpdate, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleSelectChange = (value) => {
    const category = categories.find(cat => cat.id === value);
    setSelectedCategory(category);
    setEditedName(category.name);
  };

  const handleSave = () => {
    if (selectedCategory) {
      onUpdate(selectedCategory.id, editedName); 
      resetForm(); 
      onClose(); 
    }
  };

  const handleDelete = () => {
    if (selectedCategory) {
      onDelete(selectedCategory.id);
      resetForm(); 
      onClose(); 
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setEditedName('');
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Select Category">
          <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={handleSelectChange}
            value={selectedCategory ? selectedCategory.id : undefined}
            options={categories.map(cat => ({
              value: cat.id,
              label: cat.name,
            }))}
          />
        </Form.Item>

        {selectedCategory && (
          <>
            <Form.Item label="Category ID">
              <Input value={selectedCategory.id} disabled />
            </Form.Item>

            <Form.Item label="Edit Category Name">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-end mt-4 gap-3">
                <Button type="primary" onClick={handleSave}>
                  Save
                </Button>
                <Popconfirm
                  title="Are you sure to delete this category?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
                </div>
           
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default Edit;
