import React from 'react'
import { Link } from 'react-router-dom'

const FooterOne = () => {
    return (
        <footer className="footer py-80" style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            borderRadius: '32px 32px 0 0',
            boxShadow: '0 8px 32px rgba(60,60,120,0.08)',
            fontFamily: 'Poppins, Inter, Arial, sans-serif',
            margin: '32px 0 0 0',
            overflow: 'hidden',
        }}>
            <div className="container container-lg">
                <div className="footer-item-wrapper d-flex flex-column align-items-center justify-content-center text-center gap-4">
                    <div className="footer-item mb-4">
                        <div className="footer-item__logo mb-3">
                            <Link to="/">
                                <img src="assets/images/logo/robo-logo.png" alt="" style={{ height: 72, borderRadius: 16, boxShadow: '0 2px 12px rgba(60,60,120,0.08)' }} />
                            </Link>
                        </div>
                        <div className="flex-align gap-16 mb-3 justify-content-center">
                            <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0 shadow" style={{ fontSize: 20 }}>
                                <i className="ph-fill ph-map-pin" />
                            </span>
                            <span className="text-md text-gray-900 fw-semibold">
                                North main road,Eruvadi,Tirunelveli-627103,Tamilnadu
                            </span>
                        </div>
                        <div className="flex-align gap-16 mb-3 justify-content-center">
                            <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0 shadow" style={{ fontSize: 20 }}>
                                <i className="ph-fill ph-phone-call" />
                            </span>
                                <Link
                                    to="/tel:+919003779504"
                                className="text-md text-gray-900 hover-text-main-600 fw-semibold"
                                style={{ textDecoration: 'none' }}
                                >
                                    +91 9003779504
                                </Link>
                        </div>
                        <div className="flex-align gap-16 mb-3 justify-content-center">
                            <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0 shadow" style={{ fontSize: 20 }}>
                                <i className="ph-fill ph-envelope" />
                            </span>
                            <Link
                                to="/mailto:rashikf2007@gmail.com"
                                className="text-md text-gray-900 hover-text-main-600 fw-semibold"
                                style={{ textDecoration: 'none' }}
                            >
                                rashikf2007@gmail.com
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" style={{ transition: 'transform 0.2s', color: '#4267B2', fontSize: 28 }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <i className="ph-fill ph-facebook-logo" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" style={{ transition: 'transform 0.2s', color: '#1DA1F2', fontSize: 28 }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <i className="ph-fill ph-twitter-logo" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" style={{ transition: 'transform 0.2s', color: '#E1306C', fontSize: 28 }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <i className="ph-fill ph-instagram-logo" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" style={{ transition: 'transform 0.2s', color: '#0077B5', fontSize: 28 }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <i className="ph-fill ph-linkedin-logo" />
                            </a>
                    </div>
                    </div>
                    <div className="footer-copyright mt-4 text-gray-500" style={{ fontSize: 15 }}>
                        &copy; {new Date().getFullYear()} Power Robotics. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterOne