import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
    data: { [attribute: string]: number };
    displayCounts?: boolean; 
}

const ChartFourOptions: ApexOptions = {
    colors: ['#03C95A','#0A4B5E','#FFC107','#FF6B72'], 
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
        width: '100%',
        height: 350
    },
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                background: 'transparent',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        formatter: (w) => {
                            return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
                        }
                    }
                }
            }
        }
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    responsive: [
        {
            breakpoint: 640,
            options: {
                chart: {
                    width: '100%',
                    height: 300
                }
            },
        },
    ],
    tooltip: {
      enabled: false 
    }
};

const ChartFour: React.FC<PieChartProps> = ({ data, displayCounts = false }) => {
    const attributes = Object.keys(data);
    const series = Object.values(data);

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        Attendance Overview
                    </h5>
                </div>
            </div>

            <div className="mb-2">
                <div id="chartFourChart" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={ChartFourOptions}
                        series={series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                {attributes.map((attribute, index) => (
                    <div className="sm:w-1/2 w-full px-8" key={index}>
                        <div className="flex w-full items-center">
                            <span
                                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                                style={{ backgroundColor: ChartFourOptions.colors ? ChartFourOptions.colors[index % ChartFourOptions.colors.length] : '#000' }}
                            ></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span> {attribute} </span>
                                <span> {displayCounts ? data[attribute] : `${Math.round((data[attribute] / series.reduce((a, b) => a + b, 0)) * 100)}%`} </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartFour;