import React from 'react';
import ReactDOM from 'react-dom';
import { Area, Pie } from "@ant-design/plots";

const StatisticsPage = () => {
  const config = {
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/aapl.json',
    },
    xField: (d) => new Date(d.date),
    yField: 'close',
  };
  const config2 = {
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };

  return (
    <div className='statisticsPage overflow-auto'>
      <div className="px-6 overflow-auto ">
        <h1 className="text-4xl font-bold text-center mb-4">Our Statistics</h1>
        <div>
          <h2 className="text-lg">
            Welcome{" "}
            <span className="text-green-700 font-bold text-xl">admin</span>.
          </h2>
          <div className="analysis md:grid md:grid-cols-4 grid-cols-1 md:gap-14">
          <div className="statistic-cards my-10">
            <div className="card-item bg-gray-800 p-8 rounded-lg">
              <div className="flex gap-x-4">
                <div className="rounded-full bg-white w-16 h-16 p-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/User_icon-cp.png/1200px-User_icon-cp.png" alt="" />
                </div>
                <div className="text-white">
                  <p className="mb-2 text-lg font-medium text-gray-400">Total Customer</p>
                  <p className="text-xl font-semibold text-gray-200">6</p>
                </div>
              </div>
            </div>
          </div><div className="statistic-cards my-10">
            <div className="card-item bg-gray-800 p-8 rounded-lg">
              <div className="flex gap-x-4">
                <div className="rounded-full bg-white w-16 h-16 p-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/5303/5303805.png" alt="" />
                </div>
                <div className="text-white">
                  <p className="mb-2 text-lg font-medium text-gray-400">Total Earnings</p>
                  <p className="text-xl font-semibold text-gray-200">1266.84 ₺</p>
                </div>
              </div>
            </div>
          </div><div className="statistic-cards my-10">
            <div className="card-item bg-gray-800 p-8 rounded-lg">
              <div className="flex gap-x-4">
                <div className="rounded-full bg-white w-16 h-16 p-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/1389/1389181.png" alt="" />
                </div>
                <div className="text-white">
                  <p className="mb-2 text-lg font-medium text-gray-400">Total Sales</p>
                  <p className="text-xl font-semibold text-gray-200">6</p>
                </div>
              </div>
            </div>
          </div><div className="statistic-cards my-10">
            <div className="card-item bg-gray-800 p-8 rounded-lg">
              <div className="flex gap-x-4">
                <div className="rounded-full bg-white w-16 h-16 p-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/9096/9096015.png" alt="" />
                </div>
                <div className="text-white">
                  <p className="mb-2 text-lg font-medium text-gray-400">Total Product</p>
                  <p className="text-xl font-semibold text-gray-200">6</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 justify-between pb-12  ">
            <div className='h-72'>
              <Area {...config} />
            </div>
            <div className='h-72'>
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
