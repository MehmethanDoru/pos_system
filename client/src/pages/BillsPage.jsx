import { Button, Modal, Table, message, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Highlighter from "react-highlight-words";
import PrintBill from "../components/bills/printBill";

const BillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null); 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBill(null); 
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Phone",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      ...getColumnSearchProps("customerPhoneNumber"),
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
      sorter: (a, b) => a.totalAmount - b.totalAmount,
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
        <div className="overflow-x-auto">
          <Table
            className="custom-table"
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={bills}
            bordered
            pagination={{
              pageSize: 50,
            }}
            scroll={{ x: "100%", y: "60vh" }} 
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
