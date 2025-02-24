import React from 'react';
import SummarySingleCard from '../../components/Card/SummarySingleCard';
import { CardProps } from '../../types/card';
import ChartFour from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';

const RestaurantDash: React.FC = () => {
    const cardData: CardProps[] = [
        {
            iconClass: 'fas fa-users',
            title: 'Total Employee',
            value: 313,
            percentageChange: '+10%',
            isIncrease: true,
            description: 'Than Last Year',
        },
        {
            iconClass: 'fas fa-user-check',
            title: 'Active',
            value: 55,
            percentageChange: '-2.15%',
            isIncrease: false,
            description: 'Than Last Year',
        },
        {
            iconClass: 'fas fa-user-times',
            title: 'Absent',
            value: 313,
            percentageChange: '+5.15%',
            isIncrease: true,
            description: 'Than Last Year',
        },
        {
            iconClass: 'fas fa-user-plus',
            title: 'New Hires',
            value: 150,
            percentageChange: '+5.5%',
            isIncrease: true,
            description: 'Than Last Year',
        },
        {
            iconClass: 'fas fa-user-clock',
            title: 'Late Coming',
            value: 151,
            percentageChange: '+2.15%',
            isIncrease: true,
            description: 'Than Last Month',
        },
        {
            iconClass: 'fas fa-chart-line',
            title: 'Total Working Hours',
            value: 55,
            percentageChange: '+2.15%',
            isIncrease: true,
            description: 'Than Last Month',
        },
        {
            iconClass: 'fas fa-plus-circle',
            title: 'Total Overtime Hours',
            value: 55,
            percentageChange: '+2.15%',
            isIncrease: true,
            description: 'Than Last Month',
        },
        {
            iconClass: 'fas fa-calendar-days',
            title: 'Avg. Work Days',
            value: 22,
            percentageChange: '+2.15%',
            isIncrease: true,
            description: 'Than Last Month',
        },
    ];

    const chartData = {
        Present: 59,
        Late: 21,
        Permission: 2,
        Absent: 15,
    };

    const chartData2 = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'resigned',
                data: [65, 59, 80, 81],
                borderColor: '#4c51bf',
                borderWidth: 2,
            },
            {
                label: 'new',
                data: [28, 48, 40, 19],
                borderColor: '#f6ad55',
                borderWidth: 2,
            },
        ],
    };


    return (
        <div className="bg-gray-100 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {cardData.map((card, index) => (
                    <SummarySingleCard key={index} {...card} />
                ))}
            </div>

            {/* <div className="w-1/3 mx-auto mt-4 ml-0">
                <ChartFour data={chartData} displayCounts={true} />
            </div>

            <LineChart chartData={chartData2} />  */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
                <div className="w-full"> 
                    <ChartFour data={chartData} displayCounts={true} />
                </div>
                <div className="w-full mt-10"> 
                    <LineChart chartData={chartData2} />
                </div>
            </div>

        </div>
    );
};

export default RestaurantDash;