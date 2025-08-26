import React from 'react'
import { Link } from 'react-router-dom'

const DiscountOne = () => {
    return (
        <section className="discount-modern py-80" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', borderRadius: 32, margin: '48px 0', boxShadow: '0 8px 32px rgba(60,60,120,0.10)' }}>
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-xl-6">
                        <div className="discount-item-modern rounded-24 overflow-hidden position-relative z-1 h-100 d-flex flex-column align-items-start justify-content-center" style={{ minHeight: 320, background: '#fff', boxShadow: '0 4px 16px rgba(60,60,120,0.08)' }}>
                            <img
                                src="assets/images/bg/robo-3.png"
                                alt="Electronics Discount"
                                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover"
                                style={{ opacity: 0.12 }}
                            />
                            <div className="w-100 flex-between gap-20" style={{ position: 'relative', zIndex: 2 }}>
                                <div className="discount-item__content-modern">
                                    <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 20, marginBottom: 16, display: 'block' }}>
                                        UP TO 40% OFF
                                    </span>
                                    <h6 style={{ fontWeight: 900, fontSize: 28, color: '#181A1E', marginBottom: 18, letterSpacing: '-1px' }}>
                                        Robotics Kits & Sensors Mega Sale
                                    </h6>
                                    <Link
                                        to="/shop"
                                        className="btn btn-main rounded-pill px-40 py-14 text-lg shadow-lg"
                                        style={{ fontWeight: 700, fontSize: 18, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', border: 'none', color: '#fff', boxShadow: '0 4px 24px rgba(60,60,120,0.12)', transition: 'transform 0.18s' }}
                                    >
                                        Shop Now <i className="ph ph-arrow-right" style={{ marginLeft: 10, fontSize: 22 }} />
                                    </Link>
                                </div>
                                <img
                                    src="assets/images/thumbs/robo-1.png"
                                    alt="Robot Kit"
                                    style={{ maxHeight: 160, width: 'auto', borderRadius: 20, background: '#fff', padding: 10, boxShadow: '0 2px 8px rgba(60,60,120,0.10)' }}
                                    className="d-sm-block d-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="discount-item-modern rounded-24 overflow-hidden position-relative z-1 h-100 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 320, background: '#fff', boxShadow: '0 4px 16px rgba(60,60,120,0.08)' }}>
                            <img
                                src="assets/images/bg/robo-2.png"
                                alt="Electronics Discount"
                                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover"
                                style={{ opacity: 0.12 }}
                            />
                            <div className="w-100 flex-between gap-20" style={{ position: 'relative', zIndex: 2 }}>
                                <div className="discount-item__content-modern">
                                    <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 20, marginBottom: 16, display: 'block' }}>
                                        UP TO 35% OFF
                                    </span>
                                    <h6 style={{ fontWeight: 900, fontSize: 28, color: '#181A1E', marginBottom: 18, letterSpacing: '-1px' }}>
                                        Microcontrollers & Motors Special Offer
                                    </h6>
                                    <Link
                                        to="/shop"
                                        className="btn btn-main rounded-pill px-40 py-14 text-lg shadow-lg"
                                        style={{ fontWeight: 700, fontSize: 18, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', border: 'none', color: '#fff', boxShadow: '0 4px 24px rgba(60,60,120,0.12)', transition: 'transform 0.18s' }}
                                    >
                                        Shop Now <i className="ph ph-arrow-right" style={{ marginLeft: 10, fontSize: 22 }} />
                                    </Link>
                                </div>
                                <img
                                    src="assets/images/thumbs/robo-2.jpg"
                                    alt="Microcontroller"
                                    style={{ maxHeight: 160, width: 'auto', borderRadius: 20, background: '#fff', padding: 10, boxShadow: '0 2px 8px rgba(60,60,120,0.10)' }}
                                    className="d-sm-block d-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DiscountOne