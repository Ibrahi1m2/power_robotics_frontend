import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { motion } from 'framer-motion';

const BannerOne = () => {

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-right" />
            </button>
        );
    }
    function SamplePrevArrow(props) {
        const { className, onClick } = props;

        return (

            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,


    };
    return (
        <div className="banner" style={{ width: '100%', minWidth: '100vw', position: 'relative', left: 0, right: 0, margin: 0, padding: 0, background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)' }}>
            <div style={{ width: '100%', margin: 0, padding: 0 }}>
                <div className="banner-item rounded-24 overflow-hidden position-relative arrow-center" style={{ width: '100%', minHeight: 480, margin: 0, borderRadius: 0, padding: 0 }}>
                    <a
                        href="#featureSection"
                        className="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800"
                    >
                        <span className="icon line-height-0">
                            <i className="ph ph-caret-double-down" />
                        </span>
                    </a>
                    <img
                        src="/assets/images/bg/banner-bg.png"
                        alt=""
                        className="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
                    />
                    <div className="flex-align">


                    </div>
                    <div className="banner-slider">
                        <Slider {...settings}>
                            <div className="banner-slider__item">
                                <div className="banner-slider__inner flex-between position-relative">
                                    <motion.div 
                                        className="banner-item__content"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <motion.h1 
                                            className="banner-item__title"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                        >
                                            Discovery the Future of Shopping
                                        </motion.h1>
                                        <motion.p 
                                            className="banner-item__subtitle"
                                            style={{ fontSize: '1.25rem', marginBottom: '30px' }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                        >
                                            Shop the latest, best-selling products with a premium experience and unbeatable deals.
                                        </motion.p>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                        >
                                        <Link
                                                to="/shop"
                                            className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8"
                                        >
                                            Explore Shop{" "}
                                            <span className="icon text-xl d-flex">
                                                <i className="ph ph-shopping-cart-simple" />{" "}
                                            </span>
                                        </Link>
                                        </motion.div>
                                    </motion.div>
                                    <motion.div 
                                        className="banner-item__thumb"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    >
                                        <img src="assets/images/thumbs/banner-img1.png" alt="" />
                                    </motion.div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerOne;