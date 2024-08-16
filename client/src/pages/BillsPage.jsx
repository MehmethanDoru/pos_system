import { Button, Modal, Table, message } from "antd";
import { useState, useEffect } from "react";
import PrintBill from "../components/bills/printBill";

const BillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null); 


  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/bills");
        if (res.status === 200) {
          const data = await res.json();
          setBills(data);
        } else {
          message.error("Failed to fetch bills.");
        }
      } catch (error) {
        message.error("Something went wrong.");
        console.error("Error: ", error);
      }
    };

    fetchBills(); 
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBill(null); 
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Method",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => `${text}₺`,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100, 

      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setSelectedBill(record);
              setIsModalOpen(true);
            }}
          >
            Print Bill
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Bills</h1>
        <div className="h-screen overflow-x-auto md:pb-52 pb-16">
          <Table
            className="custom-table"
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={bills}
            bordered
            pagination={{
              pageSize: 50,
            }}
            scroll={{ x: "100%" }}
          />
        </div>
      </div>

      <Modal
        title="Print Bill"
        open={isModalOpen}
        onCancel={handleModalClose} 
        footer={null}
        destroyOnClose={true} 
      >
        {selectedBill && (
          <PrintBill
            isModalOpen={isModalOpen}
            setIsModalOpen={handleModalClose} 
            bill={selectedBill}
          />
        )}
      </Modal>
    </>
  );
};

export default BillsPage;
