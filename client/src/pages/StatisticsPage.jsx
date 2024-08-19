import React, { useState, useEffect } from 'react';
import { Line, Pie } from '@ant-design/plots';

const StatisticsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Guest";
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch("http://localhost:8080/api/products");
        const productsData = await productsRes.json();
        setProducts(productsData);

        const billsRes = await fetch("http://localhost:8080/api/bills");
        const billsData = await billsRes.json();
        setBills(billsData);

        // Total earnings
        const totalSalesAmount = billsData.reduce(
          (acc, bill) => acc + bill.subTotal,
          0
        );
        setTotalSales(totalSalesAmount);

        // total earning from per customer
        const customerSales = {};
        billsData.forEach((bill) => {
          let customerName = bill.customerName;
          if (!customerName || customerName.trim() === "") {
            customerName = "Unknown";
          }
          if (customerSales[customerName]) {
            customerSales[customerName] += bill.subTotal;
          } else {
            customerSales[customerName] = bill.subTotal;
          }
        });

        // Find top 5 customer
        const sortedCustomers = Object.entries(customerSales)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, total]) => ({ name, total }));

        setTopCustomers(sortedCustomers);
      } catch (error) {
        console.error("Hata:", error);
      }
    };
    fetchData();
  }, []);

  // find total earnings per day
  const groupedData = bills.reduce((acc, bill) => {
    const date = new Date(bill.createdAt).toISOString().split("T")[0]; 
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += bill.subTotal; 
    return acc;
  }, {});

  // total earnings per day
  const lineData = Object.entries(groupedData).map(([date, total]) => ({
    date,
    total,
  }));

// Top 5 customer
  const pieData = topCustomers.map((customer) => ({
    type: customer.name, 
    value: customer.total,
  }));

  // Line Config.
  const lineConfig = {
    data: lineData,
    xField: "date",
    yField: "total",
    xAxis: { title: { text: "Tarih" } },
    yAxis: { title: { text: "Günlük Toplam Kazanç" } },
    smooth: true,
    color: "#1f77b4",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  // Pie Config.
  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    label: {
      text: " ",
      style: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        display: 'none'
      },
    },
    legend: { position: "right" },
    interactions: [{ type: "element-active" }],
  };

  return (
    <div className="statisticsPage overflow-auto">
      <div className="px-6 overflow-auto ">
        <h1 className="text-4xl font-bold text-center mb-4">Our Statistics</h1>
        <div>
          <h2 className="text-lg">
            Welcome{" "}
            <span className="text-green-700 font-bold text-xl">{username}</span>.
          </h2>
          <div className="analysis md:grid md:grid-cols-4 grid-cols-1 md:gap-14">
            <div className="statistic-cards my-10">
              <div className="card-item bg-gray-800 p-8 rounded-lg">
                <div className="flex gap-x-4">
                  <div className="rounded-full bg-white w-16 h-16 p-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/User_icon-cp.png/1200px-User_icon-cp.png"
                      alt=""
                    />
                  </div>
                  <div className="text-white">
                    <p className="mb-2 text-lg font-medium text-gray-400">
                      Total Customers
                    </p>
                    <p className="text-xl font-semibold text-gray-200">
                      {bills.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistic-cards my-10">
              <div className="card-item bg-gray-800 p-8 rounded-lg">
                <div className="flex gap-x-4">
                  <div className="rounded-full bg-white w-16 h-16 p-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5303/5303805.png"
                      alt=""
                    />
                  </div>
                  <div className="text-white">
                    <p className="mb-2 text-lg font-medium text-gray-400">
                      Total Earnings
                    </p>
                    <p className="text-xl font-semibold text-gray-200">
                      {totalSales.toFixed(2)} ₺
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistic-cards my-10">
              <div className="card-item bg-gray-800 p-8 rounded-lg">
                <div className="flex gap-x-4">
                  <div className="rounded-full bg-white w-16 h-16 p-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1389/1389181.png"
                      alt=""
                    />
                  </div>
                  <div className="text-white">
                    <p className="mb-2 text-lg font-medium text-gray-400">
                      Total Sales
                    </p>
                    <p className="text-xl font-semibold text-gray-200">
                      {bills.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistic-cards my-10">
              <div className="card-item bg-gray-800 p-8 rounded-lg">
                <div className="flex gap-x-4">
                  <div className="rounded-full bg-white w-16 h-16 p-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9096/9096015.png"
                      alt=""
                    />
                  </div>
                  <div className="text-white">
                    <p className="mb-2 text-lg font-medium text-gray-400">
                      Total Products
                    </p>
                    <p className="text-xl font-semibold text-gray-200">
                      {products.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 justify-between pb-44 md:pb-16  ">
            <div className="h-72">
              <p className="font-bold mb-4">Total Earnings per Day</p>
              {bills.length > 0 ? (
                <Line {...lineConfig} />
              ) : (
                <p>not enough data found.</p>
              )}
            </div>
            <div className="h-72">
              <p className="font-bold mb-4 md:mt-0 mt-12">Top 5 Customer</p>
              {topCustomers.length > 0 ? (
                <Pie {...pieConfig} />
              ) : (
                <p>not enough data found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
