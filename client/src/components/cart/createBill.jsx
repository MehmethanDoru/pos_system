import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const billData = {
      ...values,
      subTotal: parseFloat(cart.total.toFixed(2)),
      tax: parseFloat(((cart.total * cart.tax) / 100).toFixed(2)),
      totalAmount: parseFloat(
        (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
      ),
      cartItems: cart.cartItems.map((item) => ({
        productId: item.productId || "000000000000000000000000", 
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      if (res.status === 201) {
        message.success("The Bill Created.");
        dispatch(reset());
        navigate("/bills");
      } else {
        message.error("The Bill not Created.");
      }
    } catch (error) {
      message.error("Something went wrong.");
      console.error("Error: ", error);
    }
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
              message: "Name is required!",
            },
          ]}
        >
          <Input placeholder="Write Customer Name" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name={"customerPhoneNumber"}
          rules={[
            {
              required: true,
              message: "Phone Number is required!",
            },
          ]}
        >
          <Input placeholder="Write Phone Number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          rules={[
            {
              required: true,
              message: "Payment Method is required!",
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
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Total</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
