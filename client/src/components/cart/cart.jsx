import { Button } from "antd";
import { ClearOutlined } from '@ant-design/icons';

const cart = () => {
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
    <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
      Products in Cart
    </h2>
    <div className="cart-items">
      <div className="cart-item">cart item</div>
    </div>
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
  )
}

export default cart
