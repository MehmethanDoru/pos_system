import { Button, message } from "antd";
import { useSelector } from "react-redux";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrease, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate()

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
                className="w-16 h-16 object-cover cursor-pointer"
                onClick={() => {
                  dispatch(deleteCart(product));
                  message.success("Product Deleted from Cart.");
                }}
              />
              <div className="flex flex-col ml-2">
                <b>{product.title}</b>
                <span>
                  {product.price}₺ x {product.quantity}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  dispatch(increase(product));
                  message.success("Product Quantity Increased.");
                }}
              />
              <span className="">{product.quantity}</span>
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
                onClick={() => {
                  if (product.quantity === 1) {
                    if (window.confirm("Do you want to delete product?")) {
                      {
                        dispatch(decrease(product));
                        message.success("Product Deleted.");
                      }
                    }
                  }
                  if (product.quantity > 1) {
                    {
                      dispatch(decrease(product));
                      message.success("Product Quantity Decreased.");
                    }
                  }
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="cart mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>{cart.total.toFixed(2)}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Tax Fee (%{cart.tax})</b>
            <span className="text-red-700">
              +{((cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-600">Total</b>
            <span className="text-xl">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Order
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
            disabled={cart.cartItems.length === 0}
            onClick={() => {
              if (window.confirm("Are You Sure?")) {
                dispatch(reset());
                message.success("The Cart has been Successfully Cleaned.");
              }
            }}
          >
            Delete All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
