import React, { useEffect, useState } from "react";
import { getCountdown } from "../helper/Countdown";
import { Link } from "react-router-dom";

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='deals pb-120'>
      <div className='container container-lg'>
        <div
          className='bg-neutral-600 rounded-48 bg-img'
          style={{ backgroundImage: "url(assets/images/bg/pattern-two.png)" }}
        >
          <div className='row gy-4 align-items-center'>
            {/* Left side with products removed */}
            <div className='col-xl-6 d-md-block d-none'>
              <div className='position-relative px-24'>
                {/* No products to display */}
                <div className='text-center py-5 text-white'>
                  No products to display.
                </div>
              </div>
            </div>
            <div className='col-xl-6'>
              <div className='deals__content text-center text-xl-start px-24 py-48'>
                <div className='section-heading mb-32'>
                  <h2 className='section-heading__title text-heading-2 text-white mb-16'>
                    Deal of the Week
                  </h2>
                  <p className='section-heading__desc text-white'>
                    Get up to 50% off on selected items
                  </p>
                </div>
                <div className='deals__countdown flex-center flex-xl-start gap-16 mb-32'>
                  <div className='countdown-item bg-white rounded-8 p-16 text-center'>
                    <h3 className='text-heading-3 fw-semibold mb-8'>{timeLeft.days}</h3>
                    <span className='text-gray-500'>Days</span>
                  </div>
                  <div className='countdown-item bg-white rounded-8 p-16 text-center'>
                    <h3 className='text-heading-3 fw-semibold mb-8'>{timeLeft.hours}</h3>
                    <span className='text-gray-500'>Hours</span>
                  </div>
                  <div className='countdown-item bg-white rounded-8 p-16 text-center'>
                    <h3 className='text-heading-3 fw-semibold mb-8'>{timeLeft.minutes}</h3>
                    <span className='text-gray-500'>Minutes</span>
                  </div>
                  <div className='countdown-item bg-white rounded-8 p-16 text-center'>
                    <h3 className='text-heading-3 fw-semibold mb-8'>{timeLeft.seconds}</h3>
                    <span className='text-gray-500'>Seconds</span>
                  </div>
                </div>
                <Link
                  to='/shop'
                  className='btn bg-white text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium'
                >
                  Shop Now <i className='ph ph-arrow-right' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
