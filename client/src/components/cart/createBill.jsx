import { Button, Card, Form, Input, Modal, Select } from "antd";
import React from "react";

const createBill = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Modal
      title="Create Bill"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Customer Name"
          name={"customerName"}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input placeholder="Write Customer Name" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Phone Number is required",
            },
          ]}
          name={"phoneNumber"}
          label="Phone Number"
        >
          <Input placeholder="Write Phone Number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          rules={[
            {
              required: true,
              message: "Payment Method is required",
            },
          ]}
          name={"paymentMode"}
        >
          <Select placeholder="Select Payment Method">
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
            <Select.Option value="Edenred">Edenred</Select.Option>
            <Select.Option value="Sodexo">Sodexo</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>549.00₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %8</span>
            <span className="text-red-600">+43.92₺</span>
          </div>
          <div className="flex justify-between">
            <b>Total</b>
            <b>592.92₺</b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
            >
              Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default createBill;
