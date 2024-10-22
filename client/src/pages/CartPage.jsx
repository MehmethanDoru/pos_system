import { Button, Card, Modal, Table, message, Popconfirm, Image } from "antd";
import { useState } from "react";
import CreateBill from "../components/cart/createBill";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { deleteCart, increase, decrease } from "../redux/cartSlice.js";
import UseMediaQuery from "../hooks/useMediaQuery.jsx";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isMdUp = UseMediaQuery("(min-width: 768px)");
  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <Image src={text} alt="" className="h-20 object-cover" />;
      },
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Do you want to delete product?")) {
                    dispatch(decrease(record));
                    message.success("Product Deleted from Cart.");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Total Price",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Do you want to delete product?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Product Deleted from Cart.");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="px-6 pb-16 md:pb-24">
      <Table
        dataSource={cart.cartItems.map((item) => ({ ...item, key: item._id }))}
        columns={columns}
        bordered
        pagination={false}
        scroll={isMdUp ? { x: "100%", y: "50vh" } : { x: "100%" }}
      />
      <div className="cart-total flex justify-end">
        <Card className="w-72 mt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{cart.total.toFixed(2)}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {((cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Total</b>
            <b>{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺</b>
          </div>
          <Button
            className="mt-4 w-full"
            type="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
          >
            Order
          </Button>
        </Card>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default CartPage;
