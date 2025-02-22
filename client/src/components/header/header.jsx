import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Badge } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const cart = useSelector((state) => state.cart);
  console.log(location.pathname)

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedOut(true);
  };

  useEffect(() => {
    if (isLoggedOut) {
      navigate("/login");
    }
  }, [isLoggedOut, navigate]);

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1">
          <Link to={"/"}>
            <Input
              size="large"
              placeholder="Search Product"
              prefix={<SearchOutlined />}
              className="rounded-full max-w-[900px]"
            />
          </Link>
        </div>
        <div className="menu-links flex justify-between gap-8 md:static fixed z-50 bottom-0 md:w-auto left-0 md:border-none border-t px-4 py-1 w-full bg-white md:bg-transparent">
          <Link
            to={"/"}
            className={`menu-link flex flex-col items-center ${location.pathname === "/" ? "active" : ""}`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Home</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 6]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className={`flex flex-col ${location.pathname === "/cart" ? "active" : ""}`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Cart</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`flex flex-col ${location.pathname === "/bills" ? "active" : ""}`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Bills</span>
          </Link>
          <Link
            to={"/customer"}
            className={`flex flex-col ${location.pathname === "/customer" ? "active" : ""}`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Customers</span>
          </Link>
          <Link
            to={"/statistics"}
            className={`flex flex-col ${location.pathname === "/statistics" ? "active" : ""}`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Statistics</span>
          </Link>
          <Link onClick={handleLogout} className="flex flex-col">
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Log Out</span>
          </Link>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 6]}
          className="md:hidden flex"
        >
          <Link
            to={"/cart"}
            className={`flex flex-col ${location.pathname === "/cart" ? "active" : ""}`}
          >
            <ShoppingCartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Cart</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
