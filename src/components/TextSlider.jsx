import React from "react";
import Marquee from "react-fast-marquee";
const TextSlider = () => {
  return (
    <div className='text-slider-section overflow-hidden bg-neutral-600' style={{ width: '100vw', maxWidth: '100vw', height: '260px', minHeight: '260px', marginLeft: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='text-slider d-flex align-items-center gap-4 justify-content-center' style={{ width: '100vw', maxWidth: '100vw', height: '260px', minHeight: '260px', alignItems: 'center' }}>
        <Marquee
          speed={150}
          pauseOnHover={true}
          className='Marquee_text-slider'
        >
          <div className='d-flex flex-nowrap flex-shrink-0 flx-align gap-32'>
            <span className='flex-shrink-0'>
              <img src='assets/images/icon/star-color.png' alt='' />
            </span>
            <h2 className='text-white flex-grow-1 mb-0 fw-bold' style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
              T-Shirt Offer
            </h2>
          </div>
          <div className='d-flex flex-nowrap flex-shrink-0 flx-align gap-32'>
            <span className='flex-shrink-0'>
              <img src='assets/images/icon/star-color.png' alt='' />
            </span>
            <h2 className='text-white flex-grow-1 mb-0 fw-bold' style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
              Best Selling Offer
            </h2>
          </div>
          <div className='d-flex flex-nowrap flex-shrink-0 flx-align gap-32'>
            <span className='flex-shrink-0'>
              <img src='assets/images/icon/star-color.png' alt='' />
            </span>
            <h2 className='text-white flex-grow-1 mb-0 fw-bold' style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
              Limited Offer Sales
            </h2>
          </div>
          <div className='d-flex flex-nowrap flex-shrink-0 flx-align gap-32'>
            <span className='flex-shrink-0'>
              <img src='assets/images/icon/star-color.png' alt='' />
            </span>
            <h2 className='text-white flex-grow-1 mb-0 fw-bold' style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
              Spring Collection
            </h2>
          </div>
          <div className='d-flex flex-nowrap flex-shrink-0 flx-align gap-32'>
            <span className='flex-shrink-0'>
              <img src='assets/images/icon/star-color.png' alt='' />
            </span>
            <h2 className='text-white flex-grow-1 mb-0 fw-bold' style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
              Hot Deal Products
            </h2>
          </div>
          <div className='d-flex flex-nowrap flex-shrink-0 flx-align gap-32'>
            <span className='flex-shrink-0'>
              <img src='assets/images/icon/star-color.png' alt='' />
            </span>
            <h2 className='text-white flex-grow-1 mb-0 fw-bold' style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
              {" "}
              Our Services
            </h2>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default TextSlider;
