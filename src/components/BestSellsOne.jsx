import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCountdown } from '../helper/Countdown';

const BestSellsOne = () => {
    const [timeLeft, setTimeLeft] = useState(getCountdown());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default BestSellsOne;