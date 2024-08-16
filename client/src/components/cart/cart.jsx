import { Button } from "antd";
import { useSelector } from "react-redux";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="cart h-full md:max-h-[calc(100vh_-_90px)] flex-col mt-[-1000px] md:mt-0 max-h-[calc(100vh_-_400px)] bg-white md:bg-transparent bottom-0 hidden md:flex ">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Products in Cart
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cartItems.map((product) => (
          <li className="cart-item flex justify-between" key={product._id}>
            <div className="flex items-center">
              <img
                src={product.img}
                alt="not found"
                className="w-16 h-16 object-cover"
              />
              <div className="flex flex-col ml-2">
                <b>{product.title}</b>
                <span>{product.price}₺ x {product.quantity}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
              />
              <span className="">{product.quantity}</span>
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="cart mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>75₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Tax Fee (%8)</b>
            <span className="text-red-700">+6₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-600">Total</b>
            <span className="text-xl">81₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="large" className="w-full">
            Order
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
          >
            Delete All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
