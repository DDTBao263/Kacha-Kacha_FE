import { useState, useEffect } from 'react';

const TimeDisplay = () => {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const utcTime = now.toUTCString();
            setTime(utcTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-sm font-medium text-black dark:text-white">
            {time}
        </div>
    );
};

export default TimeDisplay; 