import React from 'react'
import { Link } from 'react-router-dom'

const DaySaleOne = () => {
    return (
        <section className="day-sale-modern" style={{ width: '100%', background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)', borderRadius: 32, margin: '48px 0', boxShadow: '0 8px 32px rgba(60,60,120,0.10)', overflow: 'hidden', position: 'relative' }}>
            <div className="container container-lg">
                <div className="day-sale-box-modern d-flex align-items-center justify-content-between position-relative" style={{ minHeight: 320, padding: '48px 0', gap: 48 }}>
                    {/* Left: Robot/Electronics Image */}
                    <div className="d-none d-md-block" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="assets/images/thumbs/robo-5.png" alt="Robot" style={{ maxHeight: 140, width: 'auto', borderRadius: 24, boxShadow: '0 4px 16px rgba(60,60,120,0.10)', background: '#fff', padding: 10 }} />
                    </div>
                    {/* Center: Content */}
                    <div className="day-sale-box__content-modern" style={{ flex: 2, textAlign: 'left', zIndex: 2 }}>
                        <h3 style={{ color: '#181A1E', fontWeight: 900, fontSize: '2.4rem', marginBottom: 18, letterSpacing: '-1px' }}>ROBOTICS SUPER SALE</h3>
                        <h6 style={{ color: '#6366f1', fontWeight: 700, fontSize: 22, marginBottom: 12 }}>UP TO 30% OFF</h6>
                        <h6 style={{ color: '#444', fontWeight: 600, fontSize: 20, marginBottom: 24 }}>Sensors, Motors & More</h6>
                        <Link
                            to="/shop"
                            className="btn btn-main rounded-pill px-48 py-16 text-lg shadow-lg"
                            style={{ fontWeight: 700, fontSize: 20, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', border: 'none', color: '#fff', boxShadow: '0 4px 24px rgba(60,60,120,0.12)', transition: 'transform 0.18s' }}
                        >
                            Shop Now <i className="ph ph-arrow-right" style={{ marginLeft: 12, fontSize: 24 }} />
                        </Link>
                    </div>
                    {/* Right: Decorative/Optional Image */}
                    <div className="d-none d-lg-block" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="assets/images/thumbs/robo-2.jpg" alt="Electronics Sale" style={{ maxHeight: 180, width: 'auto', borderRadius: 24, boxShadow: '0 4px 16px rgba(60,60,120,0.10)', background: '#fff', padding: 12 }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DaySaleOne