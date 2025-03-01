import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  colors: ['#3C50E0'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 4,
      columnWidth: '45%',
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Restaurant Manager', 'Store Manager', 'Employee'],
  },
  legend: { show: false },
  fill: { opacity: 1 },
};

const ChartTwo: React.FC = () => {
  const [state] = useState({
    series: [
      {
        name: 'Number of employees',
        data: [260, 90, 105], // Số lượng nhân viên theo từng vai trò
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
            Number of employees by role
        </h4>
      </div>
      <div>
        <ReactApexChart options={options} series={state.series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default ChartTwo;
