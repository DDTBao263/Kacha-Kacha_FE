import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface DonutChartState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#28C76F', '#EA5455'],
  labels: ['Nhà hàng hoạt động', 'Nhà hàng đóng cửa'],
  legend: {
    show: false,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const DonutChart: React.FC = () => {
  const [state, setState] = useState<DonutChartState>({
    series: [120, 30], // Ví dụ: 120 nhà hàng hoạt động, 30 nhà hàng đóng cửa
  });

  const totalRestaurants = state.series.reduce((sum, num) => sum + num, 0); // Tính tổng số nhà hàng

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <h5 className="text-xl font-semibold text-black dark:text-white mb-3">
        Total number of restaurants in the chain
      </h5>
      <div className="flex justify-center">
        <ReactApexChart options={options} series={state.series} type="donut" />
      </div>
      <div className="w-full text-center mt-6">
        <p className="text-sm font-medium text-black dark:text-white">
          Total number of restaurants:{' '}
          <span className="font-semibold">{totalRestaurants}</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex items-center">
          <span className="mr-2 block h-3 w-3 rounded-full bg-[#28C76F]"></span>
          <p className="text-sm font-medium text-black dark:text-white">
            Restaurants operating: {state.series[0]}
          </p>
        </div>
        <div className="flex items-center">
          <span className="mr-2 block h-3 w-3 rounded-full bg-[#EA5455]"></span>
          <p className="text-sm font-medium text-black dark:text-white">
            The restaurant is closed: {state.series[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
