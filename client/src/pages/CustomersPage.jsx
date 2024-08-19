import { Table } from "antd";
import { useEffect, useState } from "react";

const CustomersPage = () => {
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/bills");
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBills();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
        <div className="overflow-x-auto md:pb-52 pb-16">
          <Table
            dataSource={billItems}
            columns={columns}
            rowKey={(record) => record.id}
            bordered
            pagination={{
              pageSize: 50,
            }}
            scroll={{ x: "100%", y: "60vh" }} 
          />
        </div>
      </div>
    </>
  );
};

export default CustomersPage;
