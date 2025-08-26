import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const BannerTwo = () => {
    const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,               // Enable autoplay
    autoplaySpeed: 3000,          // Slide every 3 seconds (3000ms)
    pauseOnHover: true            // Optional: pause when mouse hovers
};


    const slides = [
        {
            img: "assets/images/bg/robo-1.png",
            title: "AI-Powered",
            buttonText: "Shop Now"
        },
        {
            img: "assets/images/bg/robo-2.png",
            title: "Smart Deals",
            buttonText: "Explore"
        },
        {
            img: "assets/images/bg/robo-3.png",
            title: "Next-Gen Shopping",
            buttonText: "Discover"
        }
    ];

    return (
        <div className="banner-two-modern" style={{ width: '100%', minHeight: 480, background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 0' }}>
    <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
      <div style={{ flex: 1, zIndex: 2 }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 32, textShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          Discover the Future of Shopping
        </h1>
        <p style={{ fontSize: 22, color: '#444', marginBottom: 40, maxWidth: 480 }}>
          Shop the latest, best-selling products with a premium experience and unbeatable deals.
        </p>
        <Link to="/products" className="btn btn-main rounded-pill px-48 py-16 text-lg shadow-lg" style={{ fontWeight: 700, fontSize: 22, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', border: 'none', color: '#fff', boxShadow: '0 4px 24px rgba(60,60,120,0.12)', transition: 'transform 0.18s' }}>
          Shop Now <i className="ph ph-arrow-right" style={{ marginLeft: 12, fontSize: 28 }} />
                                            </Link>
                                        </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <img src="/assets/images/thumbs/robo-2.jpg" alt="Robot Product" style={{ maxHeight: 380, width: 'auto', borderRadius: 32, boxShadow: '0 8px 32px rgba(60,60,120,0.18)', background: '#fff', padding: 16 }} />
                                    </div>
      {/* Decorative SVG or animated element */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 1440 320"><path fill="#6366f1" fillOpacity="0.08" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,133.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>
        </div>
    );
};

export default BannerTwo;
