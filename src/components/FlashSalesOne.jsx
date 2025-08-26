import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getCountdown } from '../helper/Countdown';
import Slider from 'react-slick';
import { useCart } from '../context/CartContext';

const SampleNextArrow = memo(function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
        >
            <i className="ph ph-caret-right" />
        </button>
    );
});

const SamplePrevArrow = memo(function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
        >
            <i className="ph ph-caret-left" />
        </button>
    );
});

const FlashSalesOne = () => {
    const { addToWishlist, removeFromWishlist, wishlistItems } = useCart();

    const handleWishlistToggle = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        const product = {
            id: productId,
            name: "Product " + productId,
            price: 14.99,
            image: `assets/images/thumbs/product-img${productId}.png`
        };
        
        if (wishlistItems.some(item => item.id === productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(product);
        }
    };

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,

                },
            },

        ],
    };

    useEffect(() => {
        const interval = setInterval(() => {
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <section className="flash-sales pt-80">
            <div className="container container-lg">
                <div className="section-heading">
                    <div className="flex-between flex-wrap gap-8">
                        <h5 className="mb-0">Flash Sales Today</h5>
                        <div className="flex-align gap-16 mr-point">
                            <Link
                                to="/contact"
                                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                            >
                                View All Deals
                            </Link>

                        </div>
                    </div>
                </div>
                <div className="flash-sales__slider arrow-style-two">
                    <Slider {...settings}>
                        <div>
                            <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                <button
                                    onClick={(e) => handleWishlistToggle(1, e)}
                                    className="btn position-absolute"
                                    style={{ top: '16px', right: '16px', zIndex: 2, background: 'none', border: 'none' }}
                                >
                                    <i className={`ph ph-heart ${wishlistItems.some(item => item.id === 1) ? 'text-danger' : 'text-gray-400'}`} 
                                       style={{ fontSize: '24px' }} />
                                </button>
                                <Link
                                    to="/product-details"
                                    className="product-card__thumb flex-center"
                                >
                                    <img src="assets/images/thumbs/product-img1.png" alt="" />
                                </Link>
                                {/* Rest of the product card content */}
                            </div>
                        </div>
                        {/* Add similar structure for other product cards */}
                    </Slider>
                </div>
            </div>
        </section>

    )
}

export default FlashSalesOne