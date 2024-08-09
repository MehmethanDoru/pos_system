import { Button, Card, Modal, Table } from "antd";
import { useState } from "react";
import PrintBill from "../components/bills/printBill";

const BillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="body px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Bills</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
      <div className="cart-total flex justify-end">
        
          <Button
              className="mt-4 w-72"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Print
            </Button>
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default BillsPage
