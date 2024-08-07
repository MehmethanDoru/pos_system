import React from "react";
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
import { Input, Avatar, Badge } from "antd";

const header = () => {
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </a>
        </div>
        <div className="header-search flex-1">
          <Input
            size="large"
            placeholder="Search Product"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[900px]"
          />
        </div>
        <div className="menu-links flex justify-between gap-8">
          <a href="" className="menu-link flex flex-col items-center">
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Home Page</span>
          </a>
            <Badge count={8} offset={[0,6]}>
          <a href="" className="flex flex-col">
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Cart</span>
          </a>
            </Badge>
          <a href="" className="flex flex-col">
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Invoices</span>
          </a>
          <a href="" className="flex flex-col">
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Customers</span>
          </a>
          <a href="" className="flex flex-col">
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Statistics</span>
          </a>
          <a href="" className="flex flex-col">
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Log Out</span>
          </a>
        </div>
      </header>
    </div>
  );
};

export default header;
